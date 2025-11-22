---
layout: page
title: Billeder
permalink: /Billeder/
---

# {{ page.title }}

Ekstra øjeblikke fra tribunen, busturene og håndarbejdet i malersjakket.

Del dine egne billeder med os så får vi dem med her.

{% assign gallery_images = site.static_files
     | where_exp: "file", "file.path contains '/assets/images/gallery/'" %}
<ul class="gallery__grid">
  {% for image in gallery_images %}
    <li class="gallery__item">
      <figure>
        <img
          src="{{ image.path | relative_url }}"
          alt="{{ image.basename | replace: '-', ' ' | replace: '_', ' ' | capitalize }}"
          loading="lazy"
          decoding="async"
          class="gallery__image">
      </figure>
    </li>
  {% endfor %}
</ul>
