export default function renderImgMarkup(data) {
    return data.hits
        .map(({ largeImageURL,
                webformatURL,
                tags,
                likes,
                views,
                comments,
                downloads }) => {
            return `<div class="photo-card">
  <a class='link_large_img' href=${largeImageURL}>
  <img src="${webformatURL}" width="320" height="200" alt="${tags}" loading="lazy" />
  </a> 
  <div class="info">
    <p class="info-item">
      <b>Likes </b>
      ${likes}
    </p>
    <p class="info-item">
      <b>Views</b>
      ${views}
    </p>
    <p class="info-item">
      <b>Comments</b>
      ${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>
      ${downloads}
    </p>
  </div>
</div>
        `
        })
    .join('')
}


