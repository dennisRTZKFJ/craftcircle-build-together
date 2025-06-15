
import { useState, useEffect } from 'react';
import { tutorialService } from '@/services/tutorial.service';

export const useTutorialLoader = (id: string | undefined) => {
  const [loading, setLoading] = useState(true);
  const [tutorial, setTutorial] = useState(null);

  useEffect(() => {
    const loadTutorial = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const tutorialData = await tutorialService.getTutorial(Number(id));
        setTutorial(tutorialData);
      } catch (error) {
        console.error("Error loading tutorial:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTutorial();
  }, [id]);

  return { loading, tutorial };
};
