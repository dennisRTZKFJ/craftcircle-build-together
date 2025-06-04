import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { Bot, ArrowRight, PenTool, Wrench, Hammer, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';

const AIAssistant = () => {
  return (
    <section className="section-bg-craft">
      <div className="container-padding">
        <div className="grid-cols-lg-2-gap-12-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <div className="relative">
              <Card className="card-craft-shadow">
                <CardHeader>
                  <div className="flex-align-center-gap-2">
                    <Bot className="h-6 w-6 text-craft-wood" />
                    <CardTitle>CraftAssist</CardTitle>
                    <Badge variant="outline" className="ml-auto badge-active">
                      Active
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="chat-bubble-muted">
                    <p className="text-sm">I'm new to woodworking and don't have many tools. What's a good first project?</p>
                  </div>
                  
                  <div className="chat-bubble-craft-wood">
                    <div className="flex-items-start-gap-2">
                      <Bot className="h-5 w-5 text-craft-wood mt-1" />
                      <div>
                        <p className="text-sm mb-3">
                          Based on your experience level, I recommend starting with a simple floating shelf. It requires minimal tools and materials:
                        </p>
                        <ul className="text-sm list-disc-spaced">
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
            <h2 className="header-xxl-spacing">Your Building Assistant. Powered by AI.</h2>
            <p className="large-muted-text-mb-8">
              Our AI helps you find the perfect projects for your skill level and provides instant answers when you get stuck.
            </p>
            
            <div className="grid-cols-sm-2-gap-4-mb-8">
              <div className="flex-items-start-gap-3">
                <div className="icon-bg-rounded">
                  <Wrench className="h-5 w-5 text-craft-wood" />
                </div>
                <div>
                  <h3 className="feature-title">Tool Recommendations</h3>
                  <p className="small-muted-text">Get personalized tool suggestions based on your existing toolkit and budget.</p>
                </div>
              </div>
              
              <div className="flex-items-start-gap-3">
                <div className="icon-bg-rounded">
                  <PenTool className="h-5 w-5 text-craft-wood" />
                </div>
                <div>
                  <h3 className="feature-title">Custom Project Plans</h3>
                  <p className="small-muted-text">Adapt existing plans to your specific space and material constraints.</p>
                </div>
              </div>
              
              <div className="flex-items-start-gap-3">
                <div className="icon-bg-rounded">
                  <Hammer className="h-5 w-5 text-craft-wood" />
                </div>
                <div>
                  <h3 className="feature-title">Technique Guidance</h3>
                  <p className="small-muted-text">Step-by-step instructions for specific woodworking techniques with visual aids.</p>
                </div>
              </div>
              
              <div className="flex-items-start-gap-3">
                <div className="icon-bg-rounded">
                  <Lightbulb className="h-5 w-5 text-craft-wood" />
                </div>
                <div>
                  <h3 className="feature-title">Creative Ideas</h3>
                  <p className="small-muted-text">Inspiration for custom touches and creative solutions to common building challenges.</p>
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
