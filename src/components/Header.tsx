import DynamiqueText from './DynamiqueText';

export default function Header() {
  return (
    <div className="absolute top-0 left-0 right-0 flex justify-center items-center h-[125px] w-full bg-[#59d6d2] z-10">
      <div className="w-[700px] h-[125px]">
        <DynamiqueText />
      </div>
    </div>
  );
}
