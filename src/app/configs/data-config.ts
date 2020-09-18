import { Category, Subcategory } from '../types/category.model';
import { PriceStatus, Shipping } from '../types/article.model';
import { AboutUs } from '../types/about.model';

export const lengthSiteList = 20; // Bestimmt wieviel Artikel pro Seite angezeigt werden (Vorsicht, muss auch in der Middleware angepasst werden)
export const loadingTimer = 250; //  Bestimmt wieviel Zeit [ms] vergeht bis die Ladeanzeige kommt
export const categories: Category[] = [
    {id: 'windsurfing', src: 'https://firebasestorage.googleapis.com/v0/b/luftkraftsport-400f6.appspot.com/o/app%2Fcategories%2Fwindsurfing.jpg?alt=media&token=4eda4795-eaf3-4f36-9b48-a6ec07b986c8', label: 'Windsurfen'},
    {id: 'kitesurfing', src: 'https://firebasestorage.googleapis.com/v0/b/luftkraftsport-400f6.appspot.com/o/app%2Fcategories%2Fkitesurfing.jpg?alt=media&token=243df488-051b-4ca6-92b3-666457efaf1c', label: 'Kitesurfen'},
    {id: 'wavesurfing', src: 'https://firebasestorage.googleapis.com/v0/b/luftkraftsport-400f6.appspot.com/o/app%2Fcategories%2Fwavesurfing.jpg?alt=media&token=949b4c98-d8be-4b10-801f-8051a4dadbd2', label: 'Wellenreiten'},
    {id: 'neopren', src: 'https://firebasestorage.googleapis.com/v0/b/luftkraftsport-400f6.appspot.com/o/app%2Fcategories%2Fneopren.jpg?alt=media&token=5512d207-7d6b-4931-a59f-8a7801f352df', label: 'Neopren'},
    {id: 'bullis', src: 'https://firebasestorage.googleapis.com/v0/b/luftkraftsport-400f6.appspot.com/o/app%2Fcategories%2Fsurfmobil.jpg?alt=media&token=2b789891-cf64-4853-bef3-220f49feaa79', label: 'Surfmobile'},
    {id: 'journeys', src: 'https://firebasestorage.googleapis.com/v0/b/luftkraftsport-400f6.appspot.com/o/app%2Fcategories%2Fsurfreisen.jpg?alt=media&token=574bbdd4-56cf-4700-b629-87e5d8bd54d6', label: 'Surfreisen'},
  ];

export const subcategories: Subcategory[] = [
      {category: 'windsurfing', id: 'sail', label: 'Segel', src: 'https://firebasestorage.googleapis.com/v0/b/luftkraftsport-400f6.appspot.com/o/app%2Fplaceholder%2Fquestionmark.jpg?alt=media&token=25517509-3afd-47be-ba26-7f547974416e'},
      {category: 'windsurfing', id: 'bag', label: 'Bags', src: 'https://firebasestorage.googleapis.com/v0/b/luftkraftsport-400f6.appspot.com/o/app%2Fplaceholder%2Fquestionmark.jpg?alt=media&token=25517509-3afd-47be-ba26-7f547974416e'},
      {category: 'windsurfing', id: 'mastbase', label: 'Mastfuß', src: 'https://firebasestorage.googleapis.com/v0/b/luftkraftsport-400f6.appspot.com/o/app%2Fplaceholder%2Fquestionmark.jpg?alt=media&token=25517509-3afd-47be-ba26-7f547974416e'},
      {category: 'windsurfing', id: 'trapez', label: 'Trapeze', src: 'https://firebasestorage.googleapis.com/v0/b/luftkraftsport-400f6.appspot.com/o/app%2Fplaceholder%2Fquestionmark.jpg?alt=media&token=25517509-3afd-47be-ba26-7f547974416e'},
      {category: 'windsurfing', id: 'fin', label: 'Finnen', src: 'https://firebasestorage.googleapis.com/v0/b/luftkraftsport-400f6.appspot.com/o/app%2Fplaceholder%2Fquestionmark.jpg?alt=media&token=25517509-3afd-47be-ba26-7f547974416e'},
      {category: 'windsurfing', id: 'board', label: 'Boards', src: 'https://firebasestorage.googleapis.com/v0/b/luftkraftsport-400f6.appspot.com/o/app%2Fplaceholder%2Fquestionmark.jpg?alt=media&token=25517509-3afd-47be-ba26-7f547974416e'},
      {category: 'windsurfing', id: 'boom', label: 'Gabel', src: 'https://firebasestorage.googleapis.com/v0/b/luftkraftsport-400f6.appspot.com/o/app%2Fplaceholder%2Fquestionmark.jpg?alt=media&token=25517509-3afd-47be-ba26-7f547974416e'},
      {category: 'windsurfing', id: 'mast', label: 'Masten', src: 'https://firebasestorage.googleapis.com/v0/b/luftkraftsport-400f6.appspot.com/o/app%2Fplaceholder%2Fquestionmark.jpg?alt=media&token=25517509-3afd-47be-ba26-7f547974416e'},
      {category: 'windsurfing', id: 'rest', label: 'Sonstiges', src: 'https://firebasestorage.googleapis.com/v0/b/luftkraftsport-400f6.appspot.com/o/app%2Fplaceholder%2Fquestionmark.jpg?alt=media&token=25517509-3afd-47be-ba26-7f547974416e'},

      {category: 'kitesurfing', id: 'kite', label: 'Kites', src: 'https://firebasestorage.googleapis.com/v0/b/luftkraftsport-400f6.appspot.com/o/app%2Fplaceholder%2Fquestionmark.jpg?alt=media&token=25517509-3afd-47be-ba26-7f547974416e'},
      {category: 'kitesurfing', id: 'board', label: 'boards', src: 'https://firebasestorage.googleapis.com/v0/b/luftkraftsport-400f6.appspot.com/o/app%2Fplaceholder%2Fquestionmark.jpg?alt=media&token=25517509-3afd-47be-ba26-7f547974416e'},

      {category: 'wavesurfing', id: 'longboard', label: 'Longboards', src: 'https://firebasestorage.googleapis.com/v0/b/luftkraftsport-400f6.appspot.com/o/app%2Fplaceholder%2Fquestionmark.jpg?alt=media&token=25517509-3afd-47be-ba26-7f547974416e'},
      {category: 'wavesurfing', id: 'shortboard', label: 'Shortboards', src: 'https://firebasestorage.googleapis.com/v0/b/luftkraftsport-400f6.appspot.com/o/app%2Fplaceholder%2Fquestionmark.jpg?alt=media&token=25517509-3afd-47be-ba26-7f547974416e'},

      {category: 'neopren', id: 'wetsuitLong', label: 'Anzug Lang', src: 'https://firebasestorage.googleapis.com/v0/b/luftkraftsport-400f6.appspot.com/o/app%2Fplaceholder%2Fquestionmark.jpg?alt=media&token=25517509-3afd-47be-ba26-7f547974416e'},
      {category: 'neopren', id: 'wetsuitShorty', label: 'Anzug Shorty', src: 'https://firebasestorage.googleapis.com/v0/b/luftkraftsport-400f6.appspot.com/o/app%2Fplaceholder%2Fquestionmark.jpg?alt=media&token=25517509-3afd-47be-ba26-7f547974416e'},
      {category: 'neopren', id: 'shoes', label: 'Schuhe', src: 'https://firebasestorage.googleapis.com/v0/b/luftkraftsport-400f6.appspot.com/o/app%2Fplaceholder%2Fquestionmark.jpg?alt=media&token=25517509-3afd-47be-ba26-7f547974416e'},

      {category: 'bullis', id: 'car', label: 'Surfbus', src: 'https://firebasestorage.googleapis.com/v0/b/luftkraftsport-400f6.appspot.com/o/app%2Fplaceholder%2Fquestionmark.jpg?alt=media&token=25517509-3afd-47be-ba26-7f547974416e'},
      {category: 'bullis', id: 'stuff', label: 'Zubehör', src: 'https://firebasestorage.googleapis.com/v0/b/luftkraftsport-400f6.appspot.com/o/app%2Fplaceholder%2Fquestionmark.jpg?alt=media&token=25517509-3afd-47be-ba26-7f547974416e'},

      {category: 'journeys', id: 'wavesurfing', label: 'Wellenreiten', src: 'https://firebasestorage.googleapis.com/v0/b/luftkraftsport-400f6.appspot.com/o/app%2Fplaceholder%2Fquestionmark.jpg?alt=media&token=25517509-3afd-47be-ba26-7f547974416e'},
      {category: 'journeys', id: 'kitesurfing', label: 'Kitesurfen', src: 'https://firebasestorage.googleapis.com/v0/b/luftkraftsport-400f6.appspot.com/o/app%2Fplaceholder%2Fquestionmark.jpg?alt=media&token=25517509-3afd-47be-ba26-7f547974416e'},
  ];

export const staticImages = {
    placeholderPortrait: 'https://firebasestorage.googleapis.com/v0/b/luftkraftsport-400f6.appspot.com/o/app%2Fplaceholder%2Fportrait-placeholder.png?alt=media&token=af2a459f-8511-4fb9-b0f7-811873c0ff6f',
    placeholderImage: 'https://firebasestorage.googleapis.com/v0/b/luftkraftsport-400f6.appspot.com/o/app%2Fplaceholder%2Fimage-placeholder.jpg?alt=media&token=b6111997-85aa-4014-9c3d-a954bcddcf65',
    iconLuftkraftsport: 'https://firebasestorage.googleapis.com/v0/b/luftkraftsport-400f6.appspot.com/o/app%2Flogo%2FLogo.png?alt=media&token=d76b35a5-f3c5-4d45-9554-28c0909ce5e7'
  };

export const conditionList: string[] = ['Gebraucht', 'Neu', 'Ersatz', 'Defekt'];

export const priceStatusList: PriceStatus[] = [{short: 'VB', long: 'Verhandlungsbasis'}, {short: 'FP', long: 'Festpreis'}];

export const shippingList: Shipping[] = [{shipping: true, label: 'Versand und Abholung'}, {shipping: false, label: 'Nur Abholung'}];


export const placeholderImage = 'https://firebasestorage.googleapis.com/v0/b/luftkraftsport-400f6.appspot.com/o/app%2Fplaceholder%2Fimage-placeholder.jpg?alt=media&token=b6111997-85aa-4014-9c3d-a954bcddcf65';


export const aboutUs: AboutUs[] = [
  {portraitUrl: 'https://firebasestorage.googleapis.com/v0/b/luftkraftsport-400f6.appspot.com/o/app%2Fplaceholder%2Fportrait-placeholder.png?alt=media&token=d29ae9be-1337-4d15-a56d-ca38c0d53263', name: 'Philipp', role: 'Entwickler', watersport: 'Windsurfen, Kitesurfen', favSpot: 'Loissin', mobil: 'Bulli T5 Custom', extra: 'baltic-Factory (weitere Projekte)'},
  {portraitUrl: 'https://firebasestorage.googleapis.com/v0/b/luftkraftsport-400f6.appspot.com/o/app%2Fplaceholder%2Fportrait-placeholder.png?alt=media&token=d29ae9be-1337-4d15-a56d-ca38c0d53263', name: 'Holger', role: 'Cloud', watersport: 'Windsurfen', favSpot: 'Loissin', mobil: 'zu Fuß'},
  {portraitUrl: 'https://firebasestorage.googleapis.com/v0/b/luftkraftsport-400f6.appspot.com/o/app%2Fplaceholder%2Fportrait-placeholder.png?alt=media&token=d29ae9be-1337-4d15-a56d-ca38c0d53263', name: 'Bernd', role: 'Gründer', watersport: 'Windsurfen', favSpot: 'Loissin', mobil: 'Defender Custom'}
];
