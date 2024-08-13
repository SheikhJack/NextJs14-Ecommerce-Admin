import { UserButton } from '@clerk/nextjs';

export default function Home() {
  return (
   <div className="flex justify-items-center text-center">
    <UserButton/>
   </div>
  );
}
