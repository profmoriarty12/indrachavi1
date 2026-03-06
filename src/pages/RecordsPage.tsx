import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Eye, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import swatchData from "@/data/swatches.json";
import ClassificationReport from "@/components/ClassificationReport";
import { useI18n } from "@/lib/i18n";

const swatches = Object.values((swatchData as any).swatches) as any[];

const dummyRecords = [
  { id: "IC-001", date: "2026-02-28", name: "Rajesh Kumar", age: "45", state: "MH", swatchIdx: 12 },
  { id: "IC-002", date: "2026-03-01", name: "Priya Sharma", age: "32", state: "KA", swatchIdx: 38 },
  { id: "IC-003", date: "2026-03-02", name: "Anil Reddy", age: "58", state: "AP", swatchIdx: 65 },
  { id: "IC-004", date: "2026-03-04", name: "Meena Devi", age: "41", state: "TN", swatchIdx: 72 },
  { id: "IC-005", date: "2026-03-05", name: "Vikram Singh", age: "27", state: "PB", swatchIdx: 5 },
];

const RecordsPage = () => {
  const { t } = useI18n();
  const [search, setSearch] = useState("");
  const [viewReport, setViewReport] = useState<typeof dummyRecords[0] | null>(null);

  const filtered = useMemo(
    () =>
      dummyRecords.filter(
        (r) =>
          r.name.toLowerCase().includes(search.toLowerCase()) ||
          r.id.toLowerCase().includes(search.toLowerCase()) ||
          r.state.toLowerCase().includes(search.toLowerCase())
      ),
    [search]
  );

  if (viewReport) {
    return (
      <ClassificationReport
        patientId={viewReport.id}
        patientName={viewReport.name}
        patientAge={viewReport.age}
        patientState={viewReport.state}
        imageUrl={null}
        onBack={() => setViewReport(null)}
      />
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-display font-bold text-foreground mb-2">{t("Patient Records")}</h1>
        <p className="text-muted-foreground">{t("records_subtitle")}</p>
      </motion.div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row gap-3 justify-between">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t("Search")}
                className="pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-24">{t("Patient ID")}</TableHead>
                  <TableHead>{t("Date")}</TableHead>
                  <TableHead>{t("Name")}</TableHead>
                  <TableHead className="w-28">{t("Matched Shade")}</TableHead>
                  <TableHead className="text-right w-28">{t("Action")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((r) => {
                  const swatch = swatches[r.swatchIdx];
                  return (
                    <TableRow key={r.id}>
                      <TableCell className="font-mono text-sm">{r.id}</TableCell>
                      <TableCell className="text-sm">{new Date(r.date).toLocaleDateString("en-IN")}</TableCell>
                      <TableCell className="font-medium">{r.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div
                            className="w-5 h-5 rounded-full border border-border"
                            style={{ backgroundColor: swatch?.hex || "#ccc" }}
                          />
                          <span className="text-xs font-mono">{swatch?.hex}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="outline" onClick={() => setViewReport(r)}>
                          <Eye className="h-4 w-4 mr-1" /> {t("View")}
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      <FileText className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">{t("No records found")}</p>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecordsPage;
