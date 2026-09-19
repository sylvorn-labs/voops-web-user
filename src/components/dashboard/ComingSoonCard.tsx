import { Empty } from '@/components/global/Empty';

type ComingSoonCardProps = {
  title: string;
  description: string;
};

export function ComingSoonCard({ title, description }: ComingSoonCardProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-20 text-center">
      <Empty title={title} description={description} />
    </div>
  );
}
