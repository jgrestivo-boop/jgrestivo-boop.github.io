import { Button, Stack } from 'react-bootstrap';

function Home() {
  return (
    <div>
      <h1 className="display-6">Welcome to your React + Bootstrap starter</h1>
      <p className="lead">
        This app is client-only, uses React Router in declarative mode, and is ready to be deployed to GitHub Pages.
      </p>
      <Stack direction="horizontal" gap={2} className="flex-wrap">
        <Button variant="primary">Primary action</Button>
        <Button variant="outline-secondary">Secondary action</Button>
      </Stack>
    </div>
  );
}

export default Home;
