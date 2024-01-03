import { Grid } from '@mantine/core';

type Props = {
  text: string;
  onClick: () => void;
};

const GridItem = ({ text, onClick }: Props) => {
  return (
    <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 3 }} className="cursor-pointer" onClick={onClick}>
      <div className="w-full h-20 aspect-square rounded-lg bg-teal-600 shadow-md flex justify-center items-center text-white hover:scale-105 transition-all">
        {text}
      </div>
    </Grid.Col>
  );
};

export { GridItem };
