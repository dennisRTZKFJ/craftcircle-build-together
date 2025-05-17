
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { Bot, ArrowRight, PenTool, Tool, Hammer, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';

const AIAssistant = () => {
  return (
    <section className="py-24 bg-craft-wood/5">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <div className="relative">
              <Card className="bg-background border-2 border-craft-wood shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Bot className="h-6 w-6 text-craft-wood" />
                    <CardTitle>CraftAssist</CardTitle>
                    <Badge variant="outline" className="ml-auto bg-green-100 text-green-800 border-green-200">
                      Active
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted p-4 rounded-lg mb-4">
                    <p className="text-sm">I'm new to woodworking and don't have many tools. What's a good first project?</p>
                  </div>
                  
                  <div className="bg-craft-wood/10 p-4 rounded-lg">
                    <div className="flex items-start gap-2">
                      <Bot className="h-5 w-5 text-craft-wood mt-1" />
                      <div>
                        <p className="text-sm mb-3">
                          Based on your experience level, I recommend starting with a simple floating shelf. It requires minimal tools and materials:
                        </p>
                        <ul className="text-sm list-disc pl-5 space-y-1 mb-3">
                          <li>You'll only need a drill, measuring tape, and level</li>
                          <li>It can be completed in under 2 hours</li>
                          <li>Total cost is approximately $25-35</li>
                        </ul>
                        <p className="text-sm">
                          Would you like me to show you some beginner-friendly floating shelf designs?
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <Button variant="outline" className="w-full">
                    Ask CraftAssist
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>

              <div className="absolute -bottom-8 -left-8 w-16 h-16 rounded-full bg-craft-light-green/30 blur-2xl"></div>
              <div className="absolute -top-8 -right-8 w-16 h-16 rounded-full bg-craft-wood/30 blur-2xl"></div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Your Building Assistant. Powered by AI.</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Our AI helps you find the perfect projects for your skill level and provides instant answers when you get stuck.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="bg-craft-wood/10 p-2 rounded-full">
                  <Tool className="h-5 w-5 text-craft-wood" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Tool Recommendations</h3>
                  <p className="text-sm text-muted-foreground">Get personalized tool suggestions based on your existing toolkit and budget.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-craft-wood/10 p-2 rounded-full">
                  <PenTool className="h-5 w-5 text-craft-wood" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Custom Project Plans</h3>
                  <p className="text-sm text-muted-foreground">Adapt existing plans to your specific space and material constraints.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-craft-wood/10 p-2 rounded-full">
                  <Hammer className="h-5 w-5 text-craft-wood" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Technique Guidance</h3>
                  <p className="text-sm text-muted-foreground">Step-by-step instructions for specific woodworking techniques with visual aids.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-craft-wood/10 p-2 rounded-full">
                  <Lightbulb className="h-5 w-5 text-craft-wood" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Creative Ideas</h3>
                  <p className="text-sm text-muted-foreground">Inspiration for custom touches and creative solutions to common building challenges.</p>
                </div>
              </div>
            </div>
            
            <Button>
              Try CraftAssist now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AIAssistant;
