import React, { useState, useEffect, useCallback } from 'react';
import { Layout } from './components/Layout';
import { 
  TitleSlide, 
  AgendaSlide, 
  IntroSlide, 
  SolutionSlide,
  TheorySlide,
  StrategySlide,
  ToolsSlide,
  ArchitectureSlide,
  ImplementationSlide,
  ConfigSlide,
  ConclusionSlide,
  FutureSlide,
  AnnexSlide,
  EndSlide
} from './components/Slides';

const App: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    <TitleSlide isActive={currentSlide === 0} />,
    <AgendaSlide isActive={currentSlide === 1} />,
    <IntroSlide isActive={currentSlide === 2} />,
    <SolutionSlide isActive={currentSlide === 3} />,
    <TheorySlide isActive={currentSlide === 4} />,
    <StrategySlide isActive={currentSlide === 5} />,
    <ToolsSlide isActive={currentSlide === 6} />,
    <ArchitectureSlide isActive={currentSlide === 7} />,
    <ImplementationSlide isActive={currentSlide === 8} />,
    <ConfigSlide isActive={currentSlide === 9} />,
    <ConclusionSlide isActive={currentSlide === 10} />,
    <FutureSlide isActive={currentSlide === 11} />,
    <AnnexSlide isActive={currentSlide === 12} />,
    <EndSlide isActive={currentSlide === 13} />
  ];

  const totalSlides = slides.length;

  const nextSlide = useCallback(() => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(prev => prev + 1);
    }
  }, [currentSlide, totalSlides]);

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  }, [currentSlide]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
        case ' ':
          nextSlide();
          break;
        case 'ArrowLeft':
          prevSlide();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  return (
    <Layout 
      currentSlide={currentSlide} 
      totalSlides={totalSlides}
      onNext={nextSlide}
      onPrev={prevSlide}
    >
      <div className="w-full h-full flex items-center justify-center">
        {slides[currentSlide]}
      </div>
    </Layout>
  );
};

export default App;