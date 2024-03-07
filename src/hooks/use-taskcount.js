import { useFetchTasksQuery } from 'store/reducers/services';
import { useServiceId } from 'utils/useServiceId';

const useGetTaskCount = (id) => {
  const serviceId = useServiceId(id);
  const { data: allTasks } = useFetchTasksQuery();

  if (allTasks && allTasks.length) {
    const filteredTasks = allTasks.filter((task) => task.service_id === serviceId && !task.reviewed);
    return filteredTasks.length;
  } else {
    return 0;
  }
};

export default useGetTaskCount;
