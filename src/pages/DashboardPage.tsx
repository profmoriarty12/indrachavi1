import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { stateData, getMelaninColor, type StateData } from "@/data/indiaStates";
import { Info } from "lucide-react";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import { useI18n } from "@/lib/i18n";

const INDIA_TOPO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";
const INDIA_STATES_TOPO = "https://gist.githubusercontent.com/jbrobst/56c13bbbf9d97d187fea01ca62ea5112/raw/e388c4cae20aa53cb5090210a42ebb9b765c0a36/india_states.json";

// Map state names from TopoJSON to our data
const stateNameMap: Record<string, string> = {
  "Jammu & Kashmir": "JK",
  "Himachal Pradesh": "HP",
  "Punjab": "PB",
  "Haryana": "HR",
  "Uttarakhand": "UK",
  "Rajasthan": "RJ",
  "Gujarat": "GJ",
  "Uttar Pradesh": "UP",
  "Bihar": "BR",
  "West Bengal": "WB",
  "Maharashtra": "MH",
  "Madhya Pradesh": "MP",
  "Chhattisgarh": "CT",
  "Odisha": "OR",
  "Jharkhand": "JH",
  "Assam": "AS",
  "Sikkim": "SK",
  "Arunachal Pradesh": "AR",
  "Nagaland": "NL",
  "Manipur": "MN",
  "Mizoram": "MZ",
  "Tripura": "TR",
  "Meghalaya": "ML",
  "Goa": "GA",
  "Karnataka": "KA",
  "Andhra Pradesh": "AP",
  "Telangana": "TS",
  "Kerala": "KL",
  "Tamil Nadu": "TN",
  "Puducherry": "PY",
  "NCT of Delhi": "DL",
  "Ladakh": "JK",
  "Chandigarh": "PB",
  "Dadra and Nagar Haveli and Daman and Diu": "GJ",
  "Lakshadweep": "KL",
  "Andaman and Nicobar Islands": "TN",
};

const stateDataMap = new Map(stateData.map((s) => [s.abbr, s]));

const DashboardPage = () => {
  const { t } = useI18n();
  const [selectedState, setSelectedState] = useState<StateData | null>(null);
  const [hoveredState, setHoveredState] = useState<StateData | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const displayState = hoveredState || selectedState;

  const handleMouseMove = (e: React.MouseEvent) => {
    setTooltipPos({ x: e.clientX, y: e.clientY });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-display font-bold text-foreground mb-2">
          {t("India Demographic Dashboard")}
        </h1>
        <p className="text-muted-foreground">
          State-wise Melanin Index & Fitzpatrick Type distribution for prosthetic formulation reference.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive Map */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-display">State-wise Melanin Index Map</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative" onMouseMove={handleMouseMove}>
                <ComposableMap
                  projection="geoMercator"
                  projectionConfig={{ scale: 1100, center: [82, 22] }}
                  width={700}
                  height={680}
                  style={{ width: "100%", height: "auto" }}
                >
                  <Geographies geography={INDIA_STATES_TOPO}>
                    {({ geographies }) =>
                      geographies.map((geo) => {
                        const geoName = geo.properties.ST_NM;
                        const abbr = stateNameMap[geoName];
                        const state = abbr ? stateDataMap.get(abbr) : null;
                        const fillColor = state ? getMelaninColor(state.melaninIndex) : "hsl(30, 15%, 90%)";

                        return (
                          <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            fill={
                              selectedState?.abbr === abbr
                                ? "hsl(24, 80%, 44%)"
                                : fillColor
                            }
                            stroke="hsl(30, 15%, 75%)"
                            strokeWidth={0.5}
                            style={{
                              default: { outline: "none" },
                              hover: { outline: "none", fill: "hsl(24, 80%, 55%)", cursor: "pointer" },
                              pressed: { outline: "none" },
                            }}
                            onMouseEnter={() => {
                              if (state) setHoveredState(state);
                            }}
                            onMouseLeave={() => setHoveredState(null)}
                            onClick={() => {
                              if (state) setSelectedState(state);
                            }}
                          />
                        );
                      })
                    }
                  </Geographies>
                </ComposableMap>

                {/* Floating tooltip */}
                {hoveredState && (
                  <div
                    className="fixed z-50 pointer-events-none bg-card border border-border rounded-lg shadow-lg p-3 min-w-[200px]"
                    style={{ left: tooltipPos.x + 16, top: tooltipPos.y - 10 }}
                  >
                    <p className="font-display font-bold text-foreground text-sm">{hoveredState.name}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <div
                        className="w-4 h-4 rounded border border-border"
                        style={{ backgroundColor: getMelaninColor(hoveredState.melaninIndex) }}
                      />
                      <span className="text-xs text-muted-foreground">MI: {hoveredState.melaninIndex}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Fitzpatrick: {hoveredState.fitzpatrickType}</p>
                    <p className="text-xs text-muted-foreground">Category: {hoveredState.toneCategory}</p>
                  </div>
                )}
              </div>

              {/* Legend */}
              <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                <span>Low MI</span>
                <div
                  className="flex-1 h-3 rounded-full"
                  style={{
                    background: `linear-gradient(to right, ${getMelaninColor(27)}, ${getMelaninColor(40)}, ${getMelaninColor(53)})`,
                  }}
                />
                <span>High MI</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detail Panel */}
        <div>
          <AnimatePresence mode="wait">
            {displayState ? (
              <motion.div
                key={displayState.abbr}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <Card className="border-primary/30">
                  <CardContent className="pt-6">
                    <div
                      className="w-full h-24 rounded-lg mb-4"
                      style={{ backgroundColor: getMelaninColor(displayState.melaninIndex) }}
                    />
                    <h3 className="text-xl font-display font-bold text-foreground mb-4">
                      {displayState.name}
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between py-2 border-b border-border">
                        <span className="text-muted-foreground">Mean Melanin Index</span>
                        <span className="font-semibold text-foreground">{displayState.melaninIndex}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-border">
                        <span className="text-muted-foreground">Fitzpatrick Type</span>
                        <span className="font-semibold text-foreground">{displayState.fitzpatrickType}</span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span className="text-muted-foreground">Tone Category</span>
                        <span className="font-semibold text-foreground">{displayState.toneCategory}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Card className="border-dashed">
                  <CardContent className="pt-6 text-center">
                    <Info className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                    <p className="text-sm text-muted-foreground">
                      Click or hover over a state on the map to view demographic skin tone data.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Stats Summary */}
          <div className="mt-4 grid grid-cols-2 gap-3">
            <Card>
              <CardContent className="pt-4 text-center">
                <p className="text-2xl font-bold text-primary">30</p>
                <p className="text-xs text-muted-foreground">States/UTs</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4 text-center">
                <p className="text-2xl font-bold text-accent">II-VI</p>
                <p className="text-xs text-muted-foreground">Fitzpatrick Range</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4 text-center">
                <p className="text-2xl font-bold text-primary">27.5</p>
                <p className="text-xs text-muted-foreground">Min MI (J&K)</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4 text-center">
                <p className="text-2xl font-bold text-foreground">52.8</p>
                <p className="text-xs text-muted-foreground">Max MI (TN)</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
