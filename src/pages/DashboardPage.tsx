import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { stateData, getMelaninColor, type StateData } from "@/data/indiaStates";
import { MapPin, Info } from "lucide-react";

const INDIA_TOPO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const DashboardPage = () => {
  const [selectedState, setSelectedState] = useState<StateData | null>(null);
  const [hoveredState, setHoveredState] = useState<StateData | null>(null);

  const displayState = hoveredState || selectedState;

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-display font-bold text-foreground mb-2">
          India Demographic Dashboard
        </h1>
        <p className="text-muted-foreground">
          State-wise Melanin Index & Fitzpatrick Type distribution for prosthetic formulation reference.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map / State Grid */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-display">State-wise Melanin Index</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 gap-2">
                {stateData.map((state) => (
                  <button
                    key={state.abbr}
                    className={`relative p-3 rounded-lg border transition-all text-center hover:shadow-md ${
                      selectedState?.abbr === state.abbr
                        ? "ring-2 ring-primary border-primary"
                        : "border-border hover:border-primary/40"
                    }`}
                    style={{ backgroundColor: getMelaninColor(state.melaninIndex) }}
                    onClick={() => setSelectedState(state)}
                    onMouseEnter={() => setHoveredState(state)}
                    onMouseLeave={() => setHoveredState(null)}
                  >
                    <span className="text-xs font-bold text-white drop-shadow-md">{state.abbr}</span>
                    <span className="block text-[10px] text-white/80 drop-shadow-md">{state.melaninIndex}</span>
                  </button>
                ))}
              </div>

              {/* Legend */}
              <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
                <span>Low MI</span>
                <div className="flex-1 h-3 rounded-full" style={{
                  background: `linear-gradient(to right, ${getMelaninColor(27)}, ${getMelaninColor(40)}, ${getMelaninColor(53)})`
                }} />
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
                      Click or hover over a state to view demographic skin tone data.
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
