import { useFetchServicesQuery } from 'store/reducers/services';

export const useServiceId = (type) => {
  const { data: services = [], isLoading, isError } = useFetchServicesQuery();
  if (isLoading || isError) {
    // Handle loading state or error
    return null;
  }
  let service;
  switch (type) {
    case 'application':
      service = services.find((service) => service.title.includes('Разработка приложений'));
      break;
    case 'webpage':
      service = services.find((service) => service.title.includes('азработка сайто'));
      break;
    case 'seo':
      service = services.find((service) => service.title.includes('еклама'));
      break;
    case 'design':
      service = services.find((service) => service.title.includes('Дизайн'));
      break;
    case 'delivery':
      service = services.find((service) => service.title.includes('аботка агрегаторов доставки'));
      break;
    case 'crm':
      service = services.find((service) => service.title.includes('CRM'));
      break;
    default:
      break;
  }
  return service?.id;
};
