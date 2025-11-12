const createThumbnail = (scene, onClick) => {
  const thumbnail = document.createElement('div');
  thumbnail.classList.add('thumbnail');

  const img = document.createElement('img');
  img.src = scene.imagePath; // Assuming scene has an imagePath property
  img.alt = scene.title; // Assuming scene has a title property
  thumbnail.appendChild(img);

  const title = document.createElement('span');
  title.textContent = scene.title;
  thumbnail.appendChild(title);

  thumbnail.addEventListener('click', () => {
    onClick(scene.id); // Assuming scene has an id property to identify it
  });

  return thumbnail;
};

export default createThumbnail;