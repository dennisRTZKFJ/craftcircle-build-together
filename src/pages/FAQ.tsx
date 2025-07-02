
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const FAQ = () => {
  const faqs = [
    {
      question: "How do I start a DIY project?",
      answer: "Browse our tutorials, choose a project that matches your skill level, and follow the step-by-step instructions."
    },
    {
      question: "What tools do I need?",
      answer: "Each tutorial includes a complete list of required tools and materials. Start with basic tools and expand your collection over time."
    },
    {
      question: "Can I sell my creations?",
      answer: "Yes! Many of our community members sell their finished projects. Just make sure to follow any licensing requirements."
    },
    {
      question: "How do I become a creator?",
      answer: "Apply through our 'Become a Creator' page. We review applications and provide training for approved creators."
    },
    {
      question: "Is there a mobile app?",
      answer: "Currently we offer a web-based platform that works great on mobile browsers. A dedicated app is in development."
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="section-y-space-lg">
        <div className="container container-padding max-w-3xl">
          <div className="text-center mb-12">
            <h1 className="header-xl mb-4">Frequently Asked Questions</h1>
            <p className="text-lg text-muted-foreground">
              Find answers to common questions about CraftCircle.
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default FAQ;
