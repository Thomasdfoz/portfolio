const fs = require('fs');
const paths = ['resources/data_eng.json', 'resources/data_br.json'];
for (const path of paths) {
  const content = fs.readFileSync(path, 'utf8');
  const data = JSON.parse(content);
  let changed = false;
  data.projects = data.projects.map(project => {
    const cleanedGallery = Array.isArray(project.galleryImages)
      ? project.galleryImages.filter((img, index) => img && img !== project.imageUrl)
      : [];
    if (JSON.stringify(cleanedGallery) !== JSON.stringify(project.galleryImages)) {
      changed = true;
      return { ...project, galleryImages: cleanedGallery };
    }
    return project;
  });
  if (changed) {
    fs.writeFileSync(path, JSON.stringify(data, null, 2) + '\n', 'utf8');
    console.log(`Cleaned duplicates in ${path}`);
  } else {
    console.log(`No duplicates found in ${path}`);
  }
}
