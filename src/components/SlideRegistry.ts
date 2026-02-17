import Slide1 from "./slides/slide1/Slide1";
import Slide2 from "./slides/slide2/Slide2";
import Slide3 from "./slides/slide3/Slide3";
import Slide5 from "./slides/slide5/Slide5";

import Slide1_InitialPrompt from "./slides/slide/Slide1_InitialPrompt";
// Import future slide components here:
// import Slide2_... from "./slides/Slide2_...";

// Maps the `component` string in slides.ts to the actual React component.
// Each component receives: { step: number }
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SLIDE_COMPONENTS: Record<string, React.ComponentType<{ step: number }>> = {
  Slide1,
  Slide2,
  Slide3,
  Slide1_InitialPrompt,
  Slide5,
  // Slide2_...,
};
