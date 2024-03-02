import { useFetchServicesQuery } from 'store/reducers/services';

export const useServiceId = (type) => {
  const { data: services = [], isLoading, isError } = useFetchServicesQuery();
  if (isLoading || isError) {
    // Handle loading state or error
    return null;
  }
  let service;
  switch (type) {
    case 'app':
      service = services.find((service) => service.title.includes('Разработка приложений'));
      break;
    case 'web':
      service = services.find((service) => service.title.includes('Разработка сайтов'));
      break;
    case 'seo':
      service = services.find((service) => service.title.includes('SEO'));
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
