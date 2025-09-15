import Home from "./(pages)/home/page";
import MainLayout from "./(pages)/layout";

export default async function MainHome() {
  return (
    <>
      <MainLayout>
        <Home />
      </MainLayout>
    </>
  );
}
