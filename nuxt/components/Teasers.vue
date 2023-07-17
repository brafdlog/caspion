<template>
  <section
    id="security"
    class="bg-white border-b py-8"
  >
    <div class="container mx-auto flex flex-wrap pt-4">
      <section-title>עקרונות האבטחה</section-title>
      <teaser-column
        :rows="3"
      >
        <template #overline>
          עקרון #1
        </template>
        <template #headline>
          ריצה מקומית
        </template>
        <template
          #content
        >
          <div class="text-gray-800 text-base px-6">
            <p class="mb-5">
              האפליקצייה רצה מקומית אצלך במחשב. הסיסמאות לא נשלחות לאף אחד, ולא מתבצעת שום בקשה לשירות חיצוני כלשהו כדי לקבל את המידע.
            </p>
            <p class="w-full font-bold text-l">
              איך זה מתבצע?
            </p>
            <p>
              <i>כספיון</i> מבוססת על פרויקט ישראלי אחר שנקרא <a href="https://github.com/eshaham/israeli-bank-scrapers/">israeli-bank-scrapers</a>, שהוא כמובן עומד בעקרונות האבטחה שלנו, ואנחנו גם עוזרים בתחזוקה שלו.
            </p>
            <p>
              יחד עם הפרויקט הזה, אנחנו מריצים את דפדפן Chrome, בצורה אוטומטית, וגולשים לאתר הבנק בדיוק כמו שמשתמש רגיל עושה זאת.
            </p>
          </div>
        </template>
      </teaser-column>
      <teaser-column
        :rows="3"
        action="GitHub"
        @clicked="openGithub"
      >
        <template #overline>
          עקרון #2
        </template>
        <template #headline>
          קוד פתוח
        </template>
        <template
          #content
        >
          <p class="text-gray-800 text-base px-6 mb-5">
            ניתן ממש לראות את הקוד בו כתובה האפליקצייה, ובמקרה הצורך גם להריץ אותה ישירות מהקוד, כדי להיות בטוחים באמינות השירות.
          </p>
        </template>
      </teaser-column>
    </div>
    <div class="container mx-auto flex flex-wrap pb-12">
      <teaser-column
        :rows="3"
      >
        <template #overline>
          שימו לב!
        </template>
        <template #headline>
          שימוש בסיסמאות
        </template>
        <template
          #content
        >
          <p class="text-gray-800 text-base px-6 mb-5">
            אנחנו מצפינים את הסיסמאות שנשמרות באפליקצייה, ועושים ככל שביכולתנו כדי לשמור עליהם. אחרי הכל, גם אנחנו משתמשים בתוכנה שלנו.
          </p>
          <p class="text-gray-800 text-base px-6 mb-5">
            אבל אחרי הכל, חשוב לזכור שסיסמאות לא נוצרו כדי שנמסור אותם לצד שלישי, וכל עוד הבנקים לא תומכים בגישה תכנותית לנתונים, מסירת הסיסמאות היא סיכון.
          </p>
          <p class="text-gray-800 text-base px-6 mb-5">
            מומלץ לבקש מהבנק לפתוח חשבון אינטרנט נוסף עם הרשאות קריאה בלבד.
          </p>
        </template>
      </teaser-column>
    </div>
  </section>
</template>

<script>
import TeaserColumn from '@/components/TeaserColumn';
import SectionTitle from '@/components/SectionTitle';

export default {
  name: 'Teasers',
  components: {
    'teaser-column': TeaserColumn,
    'section-title': SectionTitle,
  },
  methods: {
    openGithub() {
      window.open(`https://github.com/${GITHUB_REPO}`, '_blank');
    },
  },
};
</script>
