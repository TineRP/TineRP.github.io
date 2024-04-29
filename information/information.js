const buttons = document.querySelectorAll('#buttons-container button');
const information = JSON.parse(localStorage.getItem('information'))
const answers = JSON.parse(localStorage.getItem('answers'))
const prediction = JSON.parse(localStorage.getItem('prediction'))
const clickedMushroom = JSON.parse(localStorage.getItem('clickedMushroom'))
const nonFilteredInformation = JSON.parse(localStorage.getItem('nonFilteredInformation'))

const container = document.getElementById('question-container')

const header = document.createElement('h1')
header.textContent = clickedMushroom
container.appendChild(header)

let path = "../images/" + clickedMushroom + "/" + clickedMushroom + 1 + ".jpg"
const imgElement = document.createElement("img");
imgElement.src = path
imgElement.style.width = "500px"
imgElement.style.height = "500px"
container.appendChild(imgElement)

const paragraph = document.createElement('p');
paragraph.innerHTML = createText(clickedMushroom)
container.appendChild(paragraph);



function createText(clickedMushroom){
    let text = ''
    if (clickedMushroom == 'Penny bun'){
        text = 'Latin name: Boletus edulis<br>' +
               'Edibility: ' + nonFilteredInformation[clickedMushroom][0] + '<br><br>' +  
        'Description: Boletus edulis is a large bolete with a greasy, clay-buff to orange-brown cap with a ± tough, elastic cuticle (upper inset picture). The very fine pores are initially whitish, later yellowish to pale olive. The fleshy, mostly barrel-shaped stem has a whitish reticulum that is most pronounced near the top. The ± fusiform spores measure 14–17 × 4.5–6 µm. Occurs with deciduous and coniferous trees, mostly on poor, acid soils, but it has a wide tolerance. Favours Fagus, Picea and Abies and is very frequent in younger Abies plantations. Specimens with a small cap and a very large, swollen, soft stem are attacked by Hypomyces chrysospermus. Such specimens later become yellow from conidia. Very similar to B. reticulatus and B. aereus but these species lack elastic cap cuticle. Boletus pinophilus may have somewhat elastic cap cuticle but typically has a very rugose-bumpy, more reddish-brown cap surface and a darker stem. Boletus edulis may occur in almost white forms. A number of other taxa have been described around B. edulis, e.g. B. betulicola and B. pinetorum, but since this is not supported by molecular evidence, and the microscopical characters are rather weak, they are treated here as synonymous with B. edulis. Widespread and common; June–November.'
    }
    if (clickedMushroom == 'Bitter bolete'){
        text = 'Latin name: Tylopilus felleus<br>' +
        'Edibility: ' + nonFilteredInformation[clickedMushroom][0] + '<br><br>' + 
        'Description: Tylopilus felleus is a rather small to rather large, cinnamon-buff, finely felty, dry bolete with at first white, later pale rose, rather fine pores. The stem has a coarse, dark reticulum. The taste is very bitter. The flesh does not stain after sectioning or bruising. The spores are smooth, ± fusiform and measure 11–15 × 4–5 µm. The spore deposit is brownish-rose. Ectomycorrhizal with both deciduous and coniferous trees, often on poor, sandy soils. This is the only bolete in temperate Europe that acquires rose pores at maturity. Young specimens with whitish pores resemble young specimens of Boletus but these are mild-tasting, and the reticulum on the stem is usually paler. Species of Caloboletus have a similar bitter taste but the pores are yellow. Widespread, rather common to common, less so in the boreal zone; June–October, with a peak early in the season.'
    }
    if (clickedMushroom == 'Summer bolete'){
        text = 'Latin name: Boletus reticulatus<br>' +
        'Edibility: ' + nonFilteredInformation[clickedMushroom][0] + '<br><br>' + 
        'Description: Boletus reticulatus is a large bolete with a dry, clay-buff, mostly cracking, finely felty cap. The fine pores are initially whitish, later yellowish, and the ± barrel-shaped stem has a whitish to somewhat brownish, rather raised reticulum. The ± fusiform spores measure 13–17 × 4–5.5 µm. Occurs with deciduous trees, mostly in thermophilic forests on clay soils. The name B. aestivalis is a frequently used synonym. Separated from B. edulis by its pale, dry, finely felty, rather than greasy, elastic cap cuticle. Boletus aereus has much darker colours; B. pinophilus occurs only with conifers. Tylopilus felleus soon acquires a pinkish tinge on the pores, has a darker reticulum and tastes very bitter. Widespread, rather common, becoming scarcer towards the north and almost absent from the boreal zone; June–October, peaking early in the season.'
    }
    if (clickedMushroom == 'Devil\'s bolete'){
        text = 'Latin name: Rubroboletus satanas<br>' +
        'Edibility: ' + nonFilteredInformation[clickedMushroom][0] + '<br><br>' + 
        'Description: Rubroboletus satanas is a large to very large, firm-fleshed Rubroboletus with fine orange pores, a pale grey cap. The stem has a yellow to rose reticulum on the upper part and becomes ± rose and smooth towards the base. The flesh is pale yellow and moderately bluing. Mature specimens smell nauseous, recalling chicken manure, strongest from the cap surface. The hyphae in the stem base are amyloid. The spores are ± fusiform and measure 11–13.5 × 5–6 µm. Occurs with deciduous trees (Fagus, Quercus, Tilia) in warm habitats, typically on clay-rich or calcareous soils on coastal slopes. Rubroboletus legaliae and R. rhodoxanthus are similar but have rose colours on the cap and lack the nauseous smell. Species of Suillellus, Neoboletus and Imperator have an immediate blackish-blue reaction in the flesh and on the surfaces of fresh specimens. Rather rare and southern, extending northwards to southern nemoral parts of Scandinavia; mainly July–October.'
    }
    if (clickedMushroom == 'Chantarelle'){
        text = 'Latin name: Cantharellus cibarius<br>' +
        'Edibility: ' + nonFilteredInformation[clickedMushroom][0] + '<br><br>' + 
        'Description: Cantharellus cibarius is a massive, fleshy, yellow or yellow-orange, rarely almost white or pinkish orange, chanterelle with obvious decurrent ribs below the cap that is non-felty when young; it may turn ± brown when bruised. The species belongs to the group with thick-walled hyphae in the cap cuticle. Spores (7.5–)8–9.5(–10) × 4–5.5(–6) µm. Occurs on acid soils with many different mycorrhizal partners (e.g. Picea, Pinus, Quercus and Fagus). Both Cantharellus pallens and C. amethysteus have the same thick-walled hyphae in the cap cuticle, but are more fleshy, more brown-staining and paler. When young, the latter has an obviously violet cap coating. Cantharellus friesii is more fragile, has thin-walled hyphae in the cap cuticle, and is mostly more reddish; C. ferruginascens on rich soils is ± lemon-yellow and stains very strongly brown on the stem; like C. cibarius it lacks the pale cap felt when young. Widespread and common, except in heavily farmed areas; mostly June–August.'
    }
    if (clickedMushroom == 'False chantarelle'){
        text = 'Latin name: Hygrophoropsis aurantiaca<br>' +
        'Edibility: ' + nonFilteredInformation[clickedMushroom][0] + '<br><br>' + 
        'Description: Hygrophoropsis aurantiaca is a rather thin-fleshed, soft and dry, orange clitocyboid with narrow, bifurcate, soft, decurrent gills and a ± hollow stem. There are no cystidia. The smooth, somewhat thick-walled, dextrinoid spores measure 5–7 × 3.5–4.5 µm. It is found on acid litter, e.g. needle debris, but also on decomposed woody substrates, e.g. on old piles of wood chips, both in forests and in more open habitats. Chanterelles have firmer fruitbodies and branching thick veins rather than proper gills, and the spores are non-dextrinoid. Hygrophoropsis pallida is more felty and buff-yellow. H. rufa has a distinctly brown, thick cap felt. The genus belongs to the Boletales, like e.g. Paxillus. Widespread and very common; mainly July–January.'
    }
    if (clickedMushroom == 'Cantharellus pallens'){
        text = 'Latin name: Cantharellus pallens<br>' +
        'Edibility: ' + nonFilteredInformation[clickedMushroom][0] + '<br><br>' + 
        'Description: Cantharellus pallens is a large, pale, fleshy chanterelle, mostly with an eye-catching pale stem; the flesh stains strongly brown after bruising; centrally the cap may become grey with age, but also completely yellow after the white surface felt is worn off. The hyphae of the cap cuticle are thick-walled. The spores measure (7–)7.5–9.5(–10) × 3.5–5.5(–6) µm. It is mostly found on clay soils, mostly mycorrhizal with Fagus. Cantharellus cibarius is mostly more yellow, somewhat more fragile, without whitish hyphal felt on the cap and browns less strongly. Cantharellus pallens is mostly reported under the name C. subpruinosus in southern Europe. Cantharellus alborufescens is a very similar species associated with evergreeen oaks, which may occur in warmer southern parts of temperate Europe. Rather common in warmer areas and absent from the boreal zone; mostly June–October.'
    }
    if (clickedMushroom == 'Oyster mushroom'){
        text = 'Latin name: Pleurotus ostreatus<br>' +
        'Edibility: ' + nonFilteredInformation[clickedMushroom][0] + '<br><br>' + 
        'Description: Pleurotus ostreatus var. ostreatus is a large and fleshy agaric that normally starts out bluish-grey with an inrolled cap margin, but later turns browner and the margin straightens. The stem is excentric to lateral and of very variable length. The spore-deposit is ± pale lilac and the cylindrical spores measure (7–)8–12.5 × (2–)3–4.5(–5.5) µm. Mostly found on deciduous wood, often trunks of Fagus, mostly in undisturbed forests, including old deer parks, etc. Pleurotus pulmonarius is normally paler and occurs during summer. Sarcomyxa serotina can look similar, but has a sharply delimited stem and mostly yellowish coloration. Species of Crepidotus are smaller with brown spores. A pale, smaller version of P. ostreatus from Salix carrs, etc. is var. praecox. Widespread and rather common; mostly October–March.'
    }
    if (clickedMushroom == 'Sarcomyxa serotina'){
        text = 'Latin name: Sarcomyxa serotina<br>' +
        'Edibility: ' + nonFilteredInformation[clickedMushroom][0] + '<br><br>' + 
        'Description: Sarcomyxa serotina is a fleshy, somewhat gelatinous, white-spored pleurotoid agaric with a short, thick, dotted, sharply delimited, lateral stem. The cap colour is initially mostly ± orange (the bottom picture shows young primordial fruitbodies), then olive-coloured and, with age, pale grey. The gills are narrow and crowded, pale yellow, and have clavate cheilocystidia. The amyloid, narrowly allantoid spores measure 4–6.5 × 1–2 µm. Mostly on deciduous wood, e.g. Fagus, Alnus, Quercus, Betula and Salix. It produces a white rot. Young, fresh specimens are distinctive, but older material may recall small Pleurotus specimens. Pleurotus, however, lack gel in the tissues, and have a less clearly delimited transition between the gills and the stem, and completely different spores. Widespread and rather common; mostly October–February.'
    }
    if (clickedMushroom == 'Pale oyster'){
        text = 'Latin name: Pleurotus pulmonarius<br>' +
        'Edibility: ' + nonFilteredInformation[clickedMushroom][0] + '<br><br>' + 
        'Description: Pleurotus pulmonarius is a large, fleshy, almost white to grey-brown, mostly imbricate Pleurotus. The spore-deposit is ± cream. The spores measure (7.5–)8–11(–12.5) × 3–4.5 µm. Occurs mostly on large trunks of Fagus in open forests. It probably forms a hybrid population with Pleurotus ostreatus as a result of contamination of wild stock with various cultivated strains. Pleurotus ostreatus is, in its typical young form, dark bluish-grey and occurs mostly during winter. Widespread and rather common; May–September.'
    }
    if (clickedMushroom == 'Angel\'s wings'){
        text = 'Latin name: Pleurocybella porrigens<br>' +
        'Edibility: ' + nonFilteredInformation[clickedMushroom][0] + '<br><br>' + 
        'Description: Pleurocybella porrigens is a large, chalk-white to pale cream, tongue-shaped to almost funnel-shaped, rather thin-fleshed, white-spored pleurotoid agaric without cystidia. The almost spherical, smooth, hyaline, inamyloid spores measure 5–7.5 × 4–6 µm. Occurs on very decomposed conifer stumps or on wood chips. Species of Hohenbuehelia may look similar, but have a gelatinous cap cuticle and thick-walled cystidia, while species of Lentinellus have strongly serrated, tough gills. Species of Pleurotus are mostly more greyish and have thicker flesh. Common in hemiboreal–boreal areas, but much rarer in warmer, lowland regions; mostly August–November. Pleurocybella porrigens has in recent times been connected to a series of poisonings with fatal outcomes in eastern Asia. Under no circumstances should it be consumed.'
    }
    if (clickedMushroom == 'Wood hedgehog'){
        text = 'Latin name: Hydnum repandum<br>' +
        'Edibility: ' + nonFilteredInformation[clickedMushroom][0] + '<br><br>' + 
        'Description: Hydnum repandum is a large, fleshy, mostly very pale, cream, buff or buff-yellow Hydnum with pale, ± decurrent, in section spherical spines. It can occur in completely white forms. The almost spherical spores measure (6.8–)7.5–8.5(–9.2) × (5.5–)6–7.8(–8) µm; Q 1.16–1.21. Occurs both with conifers and deciduous trees, typically on rather poor soils. Mycorrhizal with e.g. Picea and Fagus. Hydnum magnorufescens is also large and fleshy but is more apricot-orange in colour, stains strongly when bruised and is more calciphilous. Hydnum vesterholtii has pale colours but is slender and has a zoned surface, and sometimes an umbilicate cap centre. The ellipsoid spores measure (7–)8–9(–9.5) × 6–7.5(–8) µm; Q 1.27–1.30. Widespread, common to rather common or occasional; July–January.'
    }
    if (clickedMushroom == 'Depressed hedgehog'){
        text = 'Latin name: Hydnum umbilicatum<br>' +
        'Edibility: ' + nonFilteredInformation[clickedMushroom][0] + '<br><br>' + 
        'Description: Hydnum umbilicatum has spines beneath it cap. However, Hydnum umbilcatum, has a small, almost circular cap with a depressed center (which reminds some of us of a belly button). Hydnum repandum’s caps are relatively large and asymmetrical, and their stems are relatively short, especially compared with the stems of Hydnum umbilicatum. It is in the Hydnaceae family of the Cantharellales order.'
      }
    
      if (clickedMushroom == 'Sarcodon squamosus'){
        text = 'Latin name: Sarcodon squamosus<br>' +
        'Edibility: ' + nonFilteredInformation[clickedMushroom][0] + '<br><br>' + 
        'Description: Sarcodon squamosus is a somewhat smaller and darker version of S. imbricatus with a prolonged inrolled cap margin and either no, or only a slightly, depressed cap centre. The scales are not as coarse. The hyphae have clamps and the spores measure 7–8.5 × 5–5.5 µm. Ectomycorrhizal with Pinus and possibly also with Abies, typically on poor, sandy soils. The species on this page are used for dyeing wool and produce different colours. The rather similar S. scabrosus lacks clamps. Widespread and rather common in the hemiboreal–boreal zones, but rare to absent from the nemoral zones; mainly September–January.'
      }
    
      if (clickedMushroom == 'Dryad\'s saddle'){
        text = 'Latin name: Polyporus squamosus<br>' +
        'Edibility: ' + nonFilteredInformation[clickedMushroom][0] + '<br><br>' + 
        'Description: Polyporus squamosus is a large to huge annual polypore with ± adpressed, coarse, yellow to dark brown scales, a dark, thick, excentric stem and thick white flesh. The pores are large, 1–2 mm wide, angular and elongated. Smells strongly farinaceous or of very ripe water melon. It may grow singly or in large, tiered groups. The smooth, hyaline spores measure 14–17 × 5–6 µm. Occurs in gardens, parks and deciduous forests on various deciduous hosts, e.g. Fagus, Ulmus and Fraxinus. Polyporus tuberaster is typically smaller, has a more central stem and more fimbriate-upright scales that form a fringe at the cap margin. Widespread and common; April–November.'
      }
    
      if (clickedMushroom == 'Field mushroom'){
        text = 'Latin name: Agaricus campestris<br>' +
        'Edibility: ' + nonFilteredInformation[clickedMushroom][0] + '<br><br>' + 
        'Description: Agaricus campestris is a rather small to medium-sized, typically white to pinkish-tinted, finely scaly Agaricus with free gills that are at first rose but later dark red-brown. The stem tapers towards the base and lacks a hyphal cord. The stem ring is thin and narrow and disappears relatively quickly; it is upwards-sheathing. There may be distinct girdles of scales below the ring. The flesh reddens somewhat and smells ± sour (like commercial mushrooms). Lacks cheilocystidia. The spores measure 6–9.5 × 4.5–7 µm. Occurs mostly in grass on open land. Agaricus altipes has a non- tapering, relatively longer stem and somewhat smaller spores. Agaricus moellerianus is very similar, but has somewhat smaller spores and yellows slightly. Agaricus devoniensis has a downwards-sheathing ring. Common and widespread; May–December. '
      }
    
      if (clickedMushroom == 'Horse mushroom'){
        text = 'Latin name: Agaricus arvensis<br>' +
        'Edibility: ' + nonFilteredInformation[clickedMushroom][0] + '<br><br>' + 
        'Description: Agaricus arvensis is a large, whitish, slowly yellowing royal with an aniseed-like smell, an upwards-sheathing cogwheel ring and a mostly clavate, somewhat scaly, whitish stem. The cheilocystidia are broadly clavate. The spores measure 5–9 × 4.5–5.5 µm and lack a germ pore. Molecular data have shown that a complex of species is involved that cannot be identified using classic, morphological characters. Agaricus arvensis may, in a broad sense, be confused with the very fleshy and large-spored A. urinascens and the longer-stemmed, small-spored A. sylvicola and A. essettii. Agaricus osecanus is treated here as a synonym of A. arvensis. The poisonous A. xanthoderma is rather similar, but stains yellow instantly when the cap margin is bruised or if the stem base is cut; it also has an ink-like smell. Widespread and common; May–December. '
      }
    
      if (clickedMushroom == 'Yellow stainer'){
        text = 'Latin name: Agaricus xanthodermus<br>' +
        'Edibility: ' + nonFilteredInformation[clickedMushroom][0] + '<br><br>' + 
        'Description: Agaricus xanthodermus is a whitish to pale brown-grey, rather large Agaricus (a yellow stainer) with a double ring and a smooth stem that is widened at the base. When young, the cap is chalk-white but stains grey and cracks with age and when exposed to the sun (top picture). When bruised at the cap margin or cut at the stem base it instantly turns bright yellow. The smell is ink-like, especially evident when heated, and the taste is similar. The spores measure 4.5–6.5 × 3.5–5.5 µm. Occurs on rich, ± disturbed soils in gardens, parks and churchyards, rarely in more natural settings. The instant yellow discolouration is the best separating character from the royals. Other yellow stainers have darker, distinctly scaly caps. Widespread, locally very common, absent from the boreal zone; May–January. '
      }
      
      if (clickedMushroom == 'Common puffball'){
        text = 'Latin name: Lycoperdon perlatum<br>' +
        'Edibility: ' + nonFilteredInformation[clickedMushroom][0] + '<br><br>' + 
        'Description: Lycoperdon perlatum is a rather large, ± pear-shaped, pale puffball with a small, round opening. The conical spines leave a distinct reticulate pattern after detachment. The scars are surrounded by persistent grains. Spores 3–4 µm; without sterigmal remnants. On soil and litter, rarely on wood, in both open and forested habitats. Lycoperdon nigrescens has convergent, longer and darker spines. Lycoperdon excipuliformis is similar when young, but the entire upper peridium disintegrates at maturity. Widespread and very common; mainly August–November. '
      }


    return text
}

const submenuItems = document.querySelectorAll('.submenu a');

submenuItems.forEach(submenuItem => {
  submenuItem.addEventListener('click', function() {
    localStorage.setItem("clickedMushroom", JSON.stringify(submenuItem.textContent));
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const burgerIcon = document.querySelector('.burger-icon');
  const menuItems = document.querySelector('.menu-items');
  const speciesMenuItem = document.getElementById('species-menu');
  const submenu = document.querySelector('.submenu');
  submenu.style.display = 'none'; 

  burgerIcon.addEventListener('click', function () {
      menuItems.classList.toggle('show');
  });

  speciesMenuItem.addEventListener('click', function (event) {
  const submenu = this.nextElementSibling;
  submenu.style.display = submenu.style.display === 'none' ? 'block' : 'none'; 
  });
});
