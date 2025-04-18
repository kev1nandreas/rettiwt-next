import CircularProgress from '@mui/material/CircularProgress';

export default function LoadingComp() {
  return (
    <div className="flex justify-center my-8 items-center gap-4">
      <CircularProgress size="30px" />
      <p>Loading...</p>
    </div>
  );
}
