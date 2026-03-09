"use client";
import { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTripStore } from "@/store/tripStore";
import { useSettingsStore } from "@/store/settingsStore";
import { Header } from "@/components/common/Header";
import { Card } from "@/components/common/Card";
import { Button } from "@/components/common/Button";
import { Select } from "@/components/common/Select";
import { CURRENCIES } from "@/lib/constants";
import { exportAllData, importAllData, clearAllData } from "@/lib/db";
import { duplicateTrip } from "@/lib/utils";
import { Trash2, Archive, Copy, Download, Upload, AlertTriangle, Smartphone, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { APP_VERSION } from "@/lib/constants";
import { IOSInstallGuide } from "@/components/common/InstallPrompt";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function SettingsPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const trip = useTripStore((s) => s.getTrip(id));
  const updateTrip = useTripStore((s) => s.updateTrip);
  const removeTrip = useTripStore((s) => s.removeTrip);
  const addTrip = useTripStore((s) => s.addTrip);
  const { baseCurrency, dateFormat, theme, updateSettings } = useSettingsStore();

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [confirmClearAll, setConfirmClearAll] = useState(false);
  const [isIOSDevice, setIsIOSDevice] = useState(false);
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  useEffect(() => {
    const nav = navigator as Navigator & { standalone?: boolean };
    const alreadyInstalled =
      nav.standalone === true || window.matchMedia("(display-mode: standalone)").matches;
    if (alreadyInstalled) return;
    const ios =
      /iphone|ipod/i.test(navigator.userAgent) ||
      /ipad/i.test(navigator.userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    setIsIOSDevice(ios);
  }, []);

  const currencyOptions = CURRENCIES.map((c) => ({ value: c.code, label: `${c.code} — ${c.name}` }));
  const dateOptions = [
    { value: "MM/DD/YYYY", label: "MM/DD/YYYY (US)" },
    { value: "DD/MM/YYYY", label: "DD/MM/YYYY (EU)" },
  ];
  const themeOptions = [
    { value: "auto", label: "System Default" },
    { value: "light", label: "Light" },
    { value: "dark", label: "Dark" },
  ];

  async function handleDeleteTrip() {
    await removeTrip(id);
    router.push("/");
  }

  async function handleArchiveTrip() {
    await updateTrip(id, { archived: true });
    router.push("/");
  }

  async function handleDuplicateTrip() {
    if (!trip) return;
    const copy = duplicateTrip(trip);
    await addTrip({
      name: copy.name,
      destination: copy.destination,
      startDate: copy.startDate,
      endDate: copy.endDate,
      budget: copy.budget,
      baseCurrency: copy.baseCurrency,
      travelers: copy.travelers,
    });
    router.push("/");
  }

  async function handleExportJSON() {
    const data = await exportAllData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "tripbudget-backup.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  async function handleImportJSON(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      await importAllData(data);
      window.location.reload();
    } catch {
      alert("Invalid backup file.");
    }
  }

  async function handleClearAll() {
    await clearAllData();
    window.location.href = "/";
  }

  return (
    <>
      <Header title="Settings" backHref={`/trip/${id}`} />
      <div className="px-4 py-4 space-y-4 max-w-lg mx-auto animate-fade-in pb-8">

        {/* Preferences */}
        <Card>
          <h3 className="font-semibold text-[var(--text-primary)] mb-4">Preferences</h3>
          <div className="space-y-4">
            <Select
              label="Default Currency"
              value={baseCurrency}
              onChange={(e) => updateSettings({ baseCurrency: e.target.value })}
              options={currencyOptions}
            />
            <Select
              label="Date Format"
              value={dateFormat}
              onChange={(e) =>
                updateSettings({ dateFormat: e.target.value as "MM/DD/YYYY" | "DD/MM/YYYY" })
              }
              options={dateOptions}
            />
            <Select
              label="Theme"
              value={theme}
              onChange={(e) =>
                updateSettings({ theme: e.target.value as "light" | "dark" | "auto" })
              }
              options={themeOptions}
            />
          </div>
        </Card>

        {/* Install App (iOS only, not already installed) */}
        {isIOSDevice && (
          <Card>
            <button
              className="w-full flex items-center gap-3 text-left"
              onClick={() => setShowIOSGuide((v) => !v)}
            >
              <div className="shrink-0 w-9 h-9 rounded-lg bg-[var(--primary)] flex items-center justify-center">
                <Smartphone size={16} className="text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-[var(--text-primary)]">Install App on iPhone / iPad</p>
                <p className="text-xs text-[var(--text-secondary)]">Add to home screen for offline access</p>
              </div>
              {showIOSGuide ? <ChevronUp size={16} className="text-[var(--text-secondary)]" /> : <ChevronDown size={16} className="text-[var(--text-secondary)]" />}
            </button>
            {showIOSGuide && <IOSInstallGuide />}
          </Card>
        )}

        {/* Trip Management */}
        {trip && (
          <Card>
            <h3 className="font-semibold text-[var(--text-primary)] mb-4">Trip Management</h3>
            <div className="space-y-2">
              <button
                onClick={handleDuplicateTrip}
                className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-slate-50 text-left transition-colors"
              >
                <Copy size={18} className="text-[var(--secondary)]" />
                <div>
                  <p className="text-sm font-medium">Duplicate Trip</p>
                  <p className="text-xs text-[var(--text-secondary)]">Create a copy without expenses</p>
                </div>
              </button>

              <button
                onClick={handleArchiveTrip}
                className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-slate-50 text-left transition-colors"
              >
                <Archive size={18} className="text-amber-500" />
                <div>
                  <p className="text-sm font-medium">Archive Trip</p>
                  <p className="text-xs text-[var(--text-secondary)]">Hide from list, keep data</p>
                </div>
              </button>

              {confirmDelete ? (
                <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                  <p className="text-sm font-medium text-[var(--danger)] mb-2">
                    Delete &ldquo;{trip.name}&rdquo;? This cannot be undone.
                  </p>
                  <div className="flex gap-2">
                    <Button variant="danger" size="sm" onClick={handleDeleteTrip}>Yes, Delete</Button>
                    <Button variant="ghost" size="sm" onClick={() => setConfirmDelete(false)}>Cancel</Button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setConfirmDelete(true)}
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-red-50 text-left transition-colors"
                >
                  <Trash2 size={18} className="text-[var(--danger)]" />
                  <div>
                    <p className="text-sm font-medium text-[var(--danger)]">Delete Trip</p>
                    <p className="text-xs text-[var(--text-secondary)]">Permanently remove all data</p>
                  </div>
                </button>
              )}
            </div>
          </Card>
        )}

        {/* Data Management */}
        <Card>
          <h3 className="font-semibold text-[var(--text-primary)] mb-4">Data Management</h3>
          <div className="space-y-2">
            <button
              onClick={handleExportJSON}
              className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-slate-50 text-left transition-colors"
            >
              <Download size={18} className="text-[var(--secondary)]" />
              <div>
                <p className="text-sm font-medium">Export Backup</p>
                <p className="text-xs text-[var(--text-secondary)]">Download all trips as JSON</p>
              </div>
            </button>

            <label className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-slate-50 text-left transition-colors cursor-pointer">
              <Upload size={18} className="text-[var(--secondary)]" />
              <div>
                <p className="text-sm font-medium">Import Backup</p>
                <p className="text-xs text-[var(--text-secondary)]">Restore trips from JSON file</p>
              </div>
              <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
            </label>

            {confirmClearAll ? (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle size={16} className="text-[var(--danger)] shrink-0 mt-0.5" />
                  <p className="text-sm font-medium text-[var(--danger)]">
                    This will delete ALL trips and data permanently.
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="danger" size="sm" onClick={handleClearAll}>Delete Everything</Button>
                  <Button variant="ghost" size="sm" onClick={() => setConfirmClearAll(false)}>Cancel</Button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setConfirmClearAll(true)}
                className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-red-50 text-left transition-colors"
              >
                <Trash2 size={18} className="text-[var(--danger)]" />
                <div>
                  <p className="text-sm font-medium text-[var(--danger)]">Clear All Data</p>
                  <p className="text-xs text-[var(--text-secondary)]">Remove all trips from this device</p>
                </div>
              </button>
            )}
          </div>
        </Card>

        {/* About */}
        <Card>
          <h3 className="font-semibold text-[var(--text-primary)] mb-3">About</h3>
          <div className="space-y-1 text-sm text-[var(--text-secondary)]">
            <div className="flex justify-between">
              <span>Version</span>
              <span className="font-mono">{APP_VERSION}</span>
            </div>
            <div className="flex justify-between">
              <span>Data storage</span>
              <span>On this device</span>
            </div>
            <div className="flex justify-between">
              <span>Authentication</span>
              <span>None required</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-[var(--border)]">
            <p className="text-xs text-[var(--text-secondary)]">
              🔒 Your data never leaves your device. No servers, no tracking.
            </p>
          </div>
        </Card>

        <div className="text-center">
          <Link href="/" className="text-sm text-[var(--primary)] hover:underline">
            ← Back to all trips
          </Link>
        </div>
      </div>
    </>
  );
}
