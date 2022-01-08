import LocalisationEN from './Localisation-En';
import LocalisationIT from './Localisation-IT';

const useLocalisation = lang => {
  const languages = {LocalisationEN, LocalisationIT};
  return languages['Localisation' + lang];
};

export default useLocalisation;
