<template>
  <main>
        <div class="container mt-4">
            <h1 class="text-right">Header</h1>
<!--            <div class="row mt-1 mb-1">-->
<!--                {% if messages %}-->
<!--                    {% for message in messages %}-->
<!--                        <div class="alert alert-success m-auto" role="alert">-->
<!--                            {{ message }}-->
<!--                            <button type="button" class="close ml-3" data-dismiss="alert" aria-label="Close">-->
<!--                                <span aria-hidden="true">&times;</span>-->
<!--                            </button>-->
<!--                        </div>-->
<!--                    {% endfor %}-->
<!--                {% endif %}-->
<!--            </div>-->
            <div class="row mt-1">
                <div class="col-lg-3">
                  <SideBar />
                </div>
                <div class="col-lg-9">

                    {% include "posts/include/menu.html" with index=True sort=sort %}
                    {% cache 20 index_page %}
                    {% endcache %}
                        {% for post in page %}
                            {% include "posts/include/card.html" with post=post params=param page_num=page.number %}
                        {% endfor %}

                    {% if page.has_other_pages %}
                        {% include "posts/include/paginator.html" with items=page paginator=paginator params=param %}
                    {% endif %}

                </div>
            </div>
        </div>
    </main>
</template>

<script>

import SideBar from "@/components/SideBar";
export default {
  name: 'Home',
  components: {
    SideBar
  }
}
</script>
