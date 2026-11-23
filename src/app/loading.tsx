import { ProgressCircle } from "@heroui/react";

const loading = () => {
  return (
      <ProgressCircle aria-label="Success" color="success" value={60}>
        <ProgressCircle.Track>
          <ProgressCircle.TrackCircle />
          <ProgressCircle.FillCircle />
        </ProgressCircle.Track>
      </ProgressCircle>
  );
};

export default loading;