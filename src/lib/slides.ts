// ─────────────────────────────────────────────────────────────────────────────
// Slide data model
//
// Each slide can have multiple "steps" (like PowerPoint animations).
// Pressing Next advances through steps first, then moves to the next slide.
// The `component` field names a custom React component in src/components/slides/
// ─────────────────────────────────────────────────────────────────────────────

export interface Slide {
  id: number;
  component: string;   // matches a key in the SLIDE_COMPONENTS registry
  totalSteps: number;  // how many "Next" presses to exhaust before slide advances
                       // 0 = no sub-steps, pressing Next immediately goes to next slide
}

export const SLIDES: Slide[] = [
  {
    id: 0,
    component: "Slide1",
    totalSteps: 1,  
  },
  {
    id: 1,
    component: "Slide2",
    totalSteps: 1,
  },
  {
    id: 2,
    component: "Slide3",
    totalSteps: 2,  
  },
  {
    id: 3,
    component: "Slide1_InitialPrompt",
    totalSteps: 3,  
  },
  {
    id: 4,
    component: "Slide5",
    totalSteps: 0,
  },
];
