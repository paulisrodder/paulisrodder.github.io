--- 
layout: page
title: Spillersange
---

## Nuværende spillere

{% for song in site.spillersange_nuvaerende %}
  {{ song.content }}
{% endfor %}
<br>
## Tidligere spillere

{% for song in site.spillersange_tidligere %}
  {{ song.content }}
{% endfor %}