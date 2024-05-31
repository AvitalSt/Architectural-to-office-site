import { observable, makeObservable, action } from 'mobx';
class BusinessStore {
  businessServices
    = [
      {
        id: '0',
        price: "200",
        name: "ניהול פרויקטים",
        describtion: " בניית פרוגרמה ראשונית, הבנת צרכי ורצונות הלקוח בניית אומדן תקציבי ולוחות זמנים לפי אבני דרך לכל תהליך הפרויקט. ליווי להוצאת היתר הבניה ובהמשך הכנת כתבי כמויות, בחירת מפרטים טכנים בהתאם לתכנון ולתקציב ויציאה למכרז קבלנים. השוואת הצעות המחיר ובניית חוזה מאובטח מול הקבלן.",
      },
      {
        id: '1',
        price: "200",
        name: ' תכנון קונסטרוקציה',
        describtion: 'תכנון שלד המבנה ומתן שרותי יעוץ הנדסי הכוללים: הצהרות מתכנן, חישובים סטטים לצורך ההיתר, תוכניות קונסטרוקציה לביצוע , תכנון אלמנטי הבטון ותכנון אלמנטי פלדה . ליווי בדיקות מעבדה במידה ונדרשות. חתימה על אישור יציבות המבנה וכמובן פיקוחים עליונים על רכיבי הקונסטרוקציה.',
      },
      {
        id: '2',
        price: "500",
        name: 'תכנון חשמל ואינסטלציה',
        describtion: 'תכנון מלא של מערכות החשמל במבנה לרבות ארונות ראשיים ומשניים חלוקה למעגלים והכנת מפרט טכני לסוגי הכבלים והאביזרים. תכנון מערכת האינסטלציה הפנימית של המבנה לרבות מערכות מים חמים וקרים, מערכות ניקוז, ביוב ועוד. תכנון מערכת הביוב הפנים מגרשית.',
      },
      {
        id: '3',
        price: "400",
        name: ' אדריכלות נוף',
        describtion: " בניית פרוגרמה ראשונית, הבנת צרכי ורצונות הלקוח בניית אומדן תקציבי ולוחות זמנים לפי אבני דרך לכל תהליך הפרויקט. ליווי להוצאת היתר הבניה ובהמשך הכנת כתבי כמויות, בחירת מפרטים טכנים בהתאם לתכנון ולתקציב ויציאה למכרז קבלנים. השוואת הצעות המחיר ובניית חוזה מאובטח מול הקבלן.",
      },
      {
        id: '4',
        price: "200",
        name: 'יעוץ קרקע וביסוס',
        describtion: ' בדיקת המגרש ע"י ביצוע חפירות / קידוחי ניסיון, איסוף הממצאים ושליחה למעבדה מורשת, ניתוח הממצאים והגשת דו"ח ביסוס לפי תקן.',

      }, {
        id: '5',
        price: "200",
        name: 'הכונת בניה',
        describtion: ' בדיקת המגרש ע"י ביצוע חפירות / קידוחי ניסיון, איסוף הממצאים ושליחה למעבדה מורשת, ניתוח הממצאים והגשת דו"ח ביסוס לפי תקן.',
      }
    ]
  businessDetails = {}

  isLogin = false;
  constructor() {
    makeObservable(this, {
      isLogin: observable,
      setIsLogin: action,
      businessServices: observable,
      businessDetails: observable,
      addService: action,
      initBusinessDetails: action,
      initialBusinessDetails: action,
      initialbusinessServices: action,
      setBusinessDetails: action,
    });
    
    if (this.businessServices.length === 6)
      this.businessServices.map(s => this.addService(s))
    console.log("the new length is: ", this.businessServices.length)
  }
  setIsLogin = (val) => {
    this.isLogin = val
  }
  get currentList() {
    return this.businessServices;
  }
  async addService(newServiceDetails) {
    try {
      if (this.businessServices.length < 6) {
        newServiceDetails.id = String(this.businessServices.length);
      }
      const serviceExists = this.businessServices.some(s => s.id === newServiceDetails.id);
      if (!serviceExists) {
        const res = await fetch(`http://localhost:8787/service`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(newServiceDetails)
        });
        console.log('res', res);
        if (res.status == 200) {
          const responseData = await res.json(); // קריאה ל-JSON על מנת לקבל את הנתונים מהשרת
          this.businessServices = [...this.businessServices, responseData];
          console.log("שרות נוסף נכנס");
          return;
        }
      }
    }catch (error) {
      console.log(error);
    }
  }
  initBusinessDetails = async (details) => {
    try {
      const response = await fetch("http://localhost:8787/businessData", {
        method: "POST",
        body: JSON.stringify(details),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.statusText);
      if (response.status === 200) {
        this.businessDetails = details;
        console.log("true");
        console.log("true", details.name);
      }
    }
    catch (error) {
      console.error('Error submitting meeting:', error);
      return false;
    }
  }
  initialBusinessDetails = async () => {
    const response = await fetch("http://localhost:8787/businessData");
    const data = await response.json();
    console.log(data);
    this.businessDetails = data;
    console.log("businessDetails", this.businessDetails);
  };
  initialbusinessServices = async () => {
    const response = await fetch("http://localhost:8787/services");
    const data = await response.json();
    console.log(data);
    this.businessServices = ([...data]);
    console.log("businessServices", this.businessServices)
  }
  setBusinessDetails = async (details) => {
    try {
      const response = await fetch("http://localhost:8787/businessData", {
        method: "POST",
        body: JSON.stringify(details),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        this.businessDetails = details;
        console.log("עדכון פרטי העסק בהצלחה!");
        return;
      }
    }
    catch (error) {
      console.error('Error submitting meeting:', error);
      return false;
    }
  };
}

export default new BusinessStore();
