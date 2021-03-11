import React, { lazy, Suspense } from "react";

import { useResponsive } from "utils/responsive";
import { ThemeWrapper } from "theme/ThemeWrapper";

export const App = () => {
  const screen = useResponsive();
  const View = lazy(() => import(`ui/views/${screen}/View`));

  return (
    <ThemeWrapper>
      <Suspense fallback={null}>
        <View />
      </Suspense>
    </ThemeWrapper>
  );
};
