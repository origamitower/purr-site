---
layout: page
group: roadmap
title: Roadmap
permalink: /roadmap/
---

# Roadmap
{: .rl-article-title }

Purr is still under active development. An experimental implementation is planned for late 2019. And an initial, practical release is expected to happen by the end of 2020.

{% include roadmap-status.html %}


## Milestones

{% for milestone in site.data.roadmap.milestones %}
{% assign is_current = false %}

{% if site.data.roadmap.milestone > forloop.index %}
  <h3><strike>{{ milestone.title }}</strike></h3>
{% elsif site.data.roadmap.milestone == forloop.index %}
  {% assign is_current = true %}
  <h3>{{ milestone.title }}</h3>
{% else %}
  <h3>{{ milestone.title }}</h3>
{% endif %}

| **Expected start:** | {{ milestone.start }} |
| **Expected release:** | {{ milestone.end }} |
{: .common-table .rl-skip-small }

{{ milestone.goal }}

<ul>
  {% for step in milestone.steps %}
    {% if site.data.roadmap.step > forloop.index %}
      <li><strike>{{ step }}</strike></li>
    {% elsif is_current and site.data.roadmap.step == forloop.index %}
      <li><strong>{{ step }}</strong></li>
    {% else %}
      <li>{{ step }}</li>
    {% endif %}
  {% endfor %}
</ul>

{% endfor %}
