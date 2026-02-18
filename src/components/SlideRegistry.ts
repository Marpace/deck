import Slide1 from "./slides/slide1/Slide1";
import Slide2 from "./slides/slide2/Slide2";
import Slide3 from "./slides/slide3/Slide3";
import Slide4 from "./slides/slide4/Slide4";
import Slide5 from "./slides/slide5/Slide5";
import Slide6 from "./slides/slide6/Slide6";


// Import future slide components here:
// import Slide2_... from "./slides/Slide2_...";

// Maps the `component` string in slides.ts to the actual React component.
// Each component receives: { step: number }
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SLIDE_COMPONENTS: Record<string, React.ComponentType<{ step: number }>> = {
  Slide1,
  Slide2,
  Slide3,
  Slide4,
  Slide5,
  Slide6,
};
