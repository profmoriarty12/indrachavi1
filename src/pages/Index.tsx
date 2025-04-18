
import { Suspense, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, useTexture, Text3D, Center } from "@react-three/drei";
import { Button } from "@/components/ui/button";
import { ArrowRight, Scan, Microscope, BarChart, Users } from "lucide-react";

// 3D Medical Model Component
const DNAModel = () => {
  const group = useRef<any>(null);
  
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
  });
  
  // Create a double helix structure
  const createHelix = (radius: number, height: number, turns: number, color: string) => {
    const points = [];
    const segments = turns * 32;
    
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const angle = t * Math.PI * 2 * turns;
      
      const x = Math.cos(angle) * radius;
      const y = height * (t - 0.5);
      const z = Math.sin(angle) * radius;
      
      points.push([x, y, z]);
    }
    
    return (
      <>
        {points.map((point, i) => (
          i % 4 === 0 && i < points.length - 1 && (
            <mesh key={`sphere-${i}`} position={[point[0], point[1], point[2]]}>
              <sphereGeometry args={[0.2, 16, 16]} />
              <meshStandardMaterial color={color} />
            </mesh>
          )
        ))}
        
        {points.map((point, i) => (
          i < points.length - 1 && i % 4 === 0 && (
            <mesh 
              key={`connector-${i}`}
              position={[
                (points[i][0] + points[i+1][0]) / 2,
                (points[i][1] + points[i+1][1]) / 2,
                (points[i][2] + points[i+1][2]) / 2
              ]}
              rotation={[
                Math.atan2(
                  Math.sqrt(
                    Math.pow(points[i+1][0] - points[i][0], 2) + 
                    Math.pow(points[i+1][2] - points[i][2], 2)
                  ),
                  points[i+1][1] - points[i][1]
                ),
                0,
                Math.atan2(
                  points[i+1][0] - points[i][0],
                  points[i+1][2] - points[i][2]
                )
              ]}
            >
              <cylinderGeometry 
                args={[
                  0.05, 0.05, 
                  Math.sqrt(
                    Math.pow(points[i][0] - points[i+1][0], 2) + 
                    Math.pow(points[i][1] - points[i+1][1], 2) + 
                    Math.pow(points[i][2] - points[i+1][2], 2)
                  ),
                  8, 1
                ]}
              />
              <meshStandardMaterial color={color} />
            </mesh>
          )
        ))}
      </>
    );
  };
  
  return (
    <group ref={group}>
      {/* First DNA strand */}
      {createHelix(3, 10, 2, "#9b87f5")}
      
      {/* Second DNA strand (offset by 180 degrees) */}
      {createHelix(3, 10, 2, "#F97316")}
      
      {/* Base pairs connecting the two strands */}
      {Array.from({ length: 16 }).map((_, i) => {
        const t = i / 15;
        const angle1 = t * Math.PI * 2 * 2;
        const angle2 = angle1 + Math.PI;
        
        const x1 = Math.cos(angle1) * 3;
        const y1 = 10 * (t - 0.5);
        const z1 = Math.sin(angle1) * 3;
        
        const x2 = Math.cos(angle2) * 3;
        const y2 = y1;
        const z2 = Math.sin(angle2) * 3;
        
        return (
          <mesh 
            key={`base-${i}`}
            position={[
              (x1 + x2) / 2,
              y1,
              (z1 + z2) / 2
            ]}
            rotation={[
              Math.PI/2,
              0,
              Math.atan2(
                x2 - x1,
                z2 - z1
              )
            ]}
          >
            <cylinderGeometry 
              args={[
                0.05, 0.05, 
                Math.sqrt(
                  Math.pow(x1 - x2, 2) + 
                  Math.pow(z1 - z2, 2)
                ),
                8, 1
              ]}
            />
            <meshStandardMaterial color="#33C3F0" />
          </mesh>
        );
      })}
    </group>
  );
};

// 3D Logo Component
const EpiToneLogo = () => {
  return (
    <Center position={[0, -2, 0]}>
      <Text3D
        font="/fonts/inter_regular.json"
        size={1.5}
        height={0.2}
        curveSegments={12}
      >
        {`EpiTone`}
        <meshStandardMaterial color="#9b87f5" />
      </Text3D>
    </Center>
  );
};

// Skin Layer Component
const SkinLayer = () => {
  const texture = useTexture('/placeholder.svg');
  
  return (
    <mesh position={[0, 0, -5]} rotation={[0, 0, 0]}>
      <planeGeometry args={[10, 6]} />
      <meshStandardMaterial map={texture} transparent opacity={0.3} />
    </mesh>
  );
};

// Main 3D Scene
const Scene = () => {
  return (
    <Canvas style={{ height: '70vh' }}>
      <PerspectiveCamera makeDefault position={[0, 0, 15]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      
      <Suspense fallback={null}>
        <DNAModel />
        <EpiToneLogo />
        <SkinLayer />
      </Suspense>
      
      <OrbitControls 
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.5}
      />
    </Canvas>
  );
};

// Main Page Component
const Index = () => {
  const features = [
    {
      icon: <Scan className="h-10 w-10 text-epitone-purple mb-2" />,
      title: "Advanced Skin Tone Analysis",
      description: "Utilize cutting-edge AI technology to accurately analyze and identify your skin tone."
    },
    {
      icon: <Microscope className="h-10 w-10 text-epitone-orange mb-2" />,
      title: "Precision Face Detection",
      description: "Our facial recognition system ensures accurate mapping for consistent results."
    },
    {
      icon: <BarChart className="h-10 w-10 text-epitone-blue mb-2" />,
      title: "Comprehensive Reports",
      description: "Receive detailed reports with personalized skincare recommendations."
    },
    {
      icon: <Users className="h-10 w-10 text-epitone-purple mb-2" />,
      title: "Expert Support",
      description: "Access to dermatologists and skincare professionals for personalized guidance."
    }
  ];
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-epitone-softPurple to-white">
        <div className="container mx-auto px-4 pt-16 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-left"
            >
              <h1 className="text-5xl font-bold text-epitone-darkPurple mb-4">
                Advanced <span className="text-epitone-purple">Skin Tone</span> Analysis Technology
              </h1>
              <p className="text-xl text-gray-700 mb-8">
                EpiTone combines AI and medical expertise to provide accurate skin analysis, personalized recommendations, and comprehensive health reports.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-epitone-purple hover:bg-epitone-purple/80 text-lg px-6 py-6" asChild>
                  <Link to="/diagnose">
                    Start Analysis <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" className="border-epitone-purple text-epitone-purple hover:bg-epitone-softPurple/50 text-lg px-6 py-6" asChild>
                  <Link to="/learn">
                    Learn More
                  </Link>
                </Button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-1"
            >
              <div className="rounded-xl overflow-hidden shadow-xl bg-white/30 backdrop-blur-sm">
                <Scene />
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Wave SVG */}
        <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0L48 8.3C96 16.7 192 33.3 288 33.3C384 33.3 480 16.7 576 16.7C672 16.7 768 33.3 864 41.7C960 50 1056 50 1152 41.7C1248 33.3 1344 16.7 1392 8.3L1440 0V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0V0Z" fill="white"/>
        </svg>
      </section>
      
      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-epitone-darkPurple mb-4">
              Advanced Features for Complete Skin Analysis
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              EpiTone provides comprehensive tools to analyze, track, and improve your skin health with medical-grade precision.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-epitone-softPurple/50 text-center"
              >
                <div className="mb-4 flex justify-center">{feature.icon}</div>
                <h3 className="text-xl font-bold text-epitone-darkPurple mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-gradient-to-r from-epitone-softPurple to-epitone-softPeach py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-epitone-darkPurple mb-6">
              Ready to Discover Your Skin's Unique Profile?
            </h2>
            <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
              Join thousands of users who have benefited from EpiTone's advanced skin analysis technology.
            </p>
            <Button 
              size="lg" 
              className="bg-epitone-purple hover:bg-epitone-purple/80 text-lg px-8 py-6"
              asChild
            >
              <Link to="/signup">
                Create Free Account <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
