import { ScrollArea } from '@/components/ui/scroll-area';
import { DashboardItemType } from '../dashboard';
import DashboardSelect from '../dashboardSelect/dashboardSelect';
import RowLoading from '../dashboardLoading/rowLoading';
import DashboardItemDistibuter from '../dashboardItems/dashboardItemsDistributer';

interface DashboardRowProps {
  row: number;
  options: string[];
  selectedList: string;
  onSelectChange: (value: number, row: number) => void;
  rowData: DashboardItemType[];
  context: string;
  isHiddenOnSmallScreens?: boolean;
}

export default function DashboardRow ({
  row,
  options,
  selectedList,
  onSelectChange,
  rowData,
  context,
  isHiddenOnSmallScreens,
}: DashboardRowProps) { 
  
  return (
    <div className={
      `flex flex-col ${isHiddenOnSmallScreens ? 'hidden lg:flex' : ''}`}
    >
      <DashboardSelect
        options={options}
        row={row}
        onSelectChange={onSelectChange}
        initial={selectedList}
        className="mb-2"
      />
      <ScrollArea
        className="flex max-h-[calc(100vh-10rem)] rounded-lg w-auto"
      >
        {!rowData.length && <RowLoading />}
        {rowData.map((item, index) => (
          <DashboardItemDistibuter
            position={index + 1}
            key={item.line ?? item.line1}
            line={item.line}
            line1={item.line1}
            line2={item.line2}
            line3={item.line3}
            line4={item.line4}
            links={item.links}
            context={context}
          />
        ))}
      </ScrollArea>
    </div>
  );}