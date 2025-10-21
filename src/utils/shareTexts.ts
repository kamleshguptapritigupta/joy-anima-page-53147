/**
 * Catchy share texts for different event types
 * Each event has multiple options that are randomly selected when sharing
 */

export interface ShareText {
  text: string;
  emoji: string;
}

export const shareTexts: Record<string, ShareText[]> = {
  birthday: [
    { text: "🎂 **SURPRISE!** Someone made something *AMAZING* for you! 🎉\n✨ Click to see your special birthday greeting! 🎁", emoji: "🎂" },
    { text: "🎈 **OMG!** You won't believe this birthday surprise! 🎊\n💝 *Tap here* to open your gift! 🎁✨", emoji: "🎈" },
    { text: "🎉 **BIRTHDAY MAGIC** just for YOU! ✨\n🎂 Someone spent time creating something *special*... Click to unwrap! 🎁", emoji: "🎉" },
    { text: "🌟 **SPECIAL DELIVERY** for the birthday star! ⭐\n🎈 *Your personalized surprise awaits...* Click now! 🎊", emoji: "🌟" },
    { text: "🎁 **BREAKING NEWS:** You have a birthday greeting waiting! 📰\n✨ *Don't keep it waiting...* Open here! 🎂🎉", emoji: "🎁" },
    { text: "🎊 **IT'S YOUR DAY!** 🎂 Someone crafted birthday magic!\n✨ *Click here* to receive your special surprise! 🎁🎈", emoji: "🎊" },
    { text: "🥳 **PARTY ALERT!** 🎉 Your birthday wishes are ready!\n🎂 *Tap to unwrap* the most amazing greeting! ✨🎁", emoji: "🥳" },
    { text: "🎂 **CAKE TIME!** 🍰 A personalized birthday treat awaits!\n✨ Someone made *magic* just for you... Click! 🎉", emoji: "🎂" },
    { text: "🌈 **RAINBOW WISHES!** 🎨 Your birthday surprise is here!\n🎁 *Open now* for something truly special! 🎂✨", emoji: "🌈" },
    { text: "💝 **GIFT INCOMING!** 🎁 Birthday love in digital form!\n🎂 Click to see what someone *created with care!* 🎉", emoji: "💝" },
  ],
  
  anniversary: [
    { text: "💕 **LOVE IS IN THE AIR!** 💑\n✨ A *beautiful* anniversary message awaits you! Click to feel the love! 💝", emoji: "💕" },
    { text: "🥂 **CELEBRATION TIME!** Here's to your love story! 💍\n💑 *Someone crafted something special...* Tap to see! ✨", emoji: "🥂" },
    { text: "💝 **LOVE LETTER** delivered digitally! 💌\n💕 Click here for your *romantic* anniversary surprise! 🌹", emoji: "💝" },
    { text: "🌹 **ROSES ARE RED...** and your greeting is ready! 💐\n💑 *Open this for anniversary magic!* ✨🥂", emoji: "🌹" },
    { text: "💍 **TRUE LOVE ALERT!** 💕 Your anniversary greeting is here!\n✨ *Click to celebrate your journey together!* 🎊", emoji: "💍" },
    { text: "💑 **FOREVER & ALWAYS!** 💖 Anniversary wishes await!\n🥂 *Open for romantic magic* created just for you! ✨", emoji: "💑" },
    { text: "🎊 **LOVE MILESTONE!** 💕 Your special day is celebrated!\n💝 *Tap here* for heartfelt anniversary surprise! 🌹", emoji: "🎊" },
    { text: "💖 **HEARTS UNITED!** 💑 Beautiful memories in a click!\n✨ Someone made *anniversary magic* for you! 🥂", emoji: "💖" },
  ],
  
  wedding: [
    { text: "💒 **JUST MARRIED!** 🎊 Celebration time!\n💍 *A special wedding greeting awaits...* Click to join the joy! ✨", emoji: "💒" },
    { text: "🎊 **WEDDING BELLS** are ringing! 🔔\n💑 Someone created *magic* for the newlyweds! Tap here! 💝", emoji: "🎊" },
    { text: "💐 **HAPPILY EVER AFTER** starts here! 💕\n✨ Click for a *beautiful* wedding surprise! 👰🤵", emoji: "💐" },
    { text: "💍 **MR. & MRS.** 💕 Your wedding greeting is ready!\n🎉 *Open this to celebrate the big day!* ✨💒", emoji: "💍" },
    { text: "👰 **WEDDING MAGIC** in a click! 🤵\n💕 *Someone spent love crafting this...* Tap to see! 🎊", emoji: "👰" },
    { text: "🔔 **HEAR THAT?** 💒 Wedding bells for the happy couple!\n✨ *Tap to celebrate* their special day! 💑🎉", emoji: "🔔" },
    { text: "💕 **TWO HEARTS, ONE LOVE!** 💍 Wedding joy awaits!\n👰 *Click here* for a beautiful surprise! 🤵✨", emoji: "💕" },
    { text: "🎉 **THE BIG DAY!** 💒 Love is being celebrated!\n💐 *Open this* for wedding magic! 👰🤵💕", emoji: "🎉" },
  ],
  
  graduation: [
    { text: "🎓 **CONGRATS GRADUATE!** 🎊 The future is bright!\n✨ *Click here* for your special achievement surprise! 📚🌟", emoji: "🎓" },
    { text: "📚 **STRAIGHT A'S** in awesomeness! 🌟\n🎓 Someone created a *special* graduation greeting! Tap now! ✨", emoji: "📚" },
    { text: "🎊 **YOU DID IT!** Cap tossed, dreams unlocked! 🎓\n✨ *Your personalized celebration awaits...* Click here! 🌟", emoji: "🎊" },
    { text: "🌟 **SCHOLAR ALERT!** 🎓 Your hard work paid off!\n📚 *Open this for your graduation surprise!* ✨🎉", emoji: "🌟" },
    { text: "🎓 **DIPLOMA UNLOCKED!** 🏆 Achievement complete!\n✨ Click to see what someone *specially crafted* for you! 🎊", emoji: "🎓" },
    { text: "🏆 **MISSION ACCOMPLISHED!** 🎓 Success is yours!\n📚 *Tap here* for your graduation celebration! 🌟✨", emoji: "🏆" },
    { text: "🎉 **TASSEL TURNED!** 🎓 New chapter begins!\n✨ Someone made *magic* to celebrate your achievement! 📚", emoji: "🎉" },
    { text: "📖 **BOOK CLOSED, FUTURE OPEN!** 🎓 Congrats!\n🌟 *Click for* your special graduation message! 🎊", emoji: "📖" },
  ],
  
  newyear: [
    { text: "🎆 **HAPPY NEW YEAR!** 2025 is HERE! 🎊\n✨ Click for a *sparkling* New Year surprise! 🥳🍾", emoji: "🎆" },
    { text: "🥳 **NEW YEAR, NEW VIBES!** 🎉\n🎆 Someone made *magic* for you! Tap to celebrate! ✨🍾", emoji: "🥳" },
    { text: "🍾 **POP THE CHAMPAGNE!** 🥂 It's party time!\n✨ *Your personalized New Year greeting awaits...* Click! 🎊", emoji: "🍾" },
    { text: "🎊 **COUNTDOWN COMPLETE!** 🎆 Welcome the new year!\n✨ Click here for your *special* celebration! 🥳", emoji: "🎊" },
    { text: "🌟 **NEW BEGINNINGS** start with this click! ✨\n🎆 *Someone crafted New Year magic for you...* Open now! 🎉", emoji: "🌟" },
    { text: "🥂 **CHEERS TO 2025!** 🎆 New year magic awaits!\n✨ *Tap here* for your sparkling surprise! 🍾🎉", emoji: "🥂" },
    { text: "🎉 **3...2...1... HAPPY NEW YEAR!** 🎆\n✨ Click to unwrap your *special* celebration! 🥳🍾", emoji: "🎉" },
    { text: "✨ **FRESH START AHEAD!** 🎆 2025 is calling!\n🥳 *Open now* for New Year wishes! 🎊🍾", emoji: "✨" },
  ],
  
  christmas: [
    { text: "🎄 **HO HO HO!** Santa's got a surprise! 🎅\n✨ *Click here* for your Christmas magic! 🎁❄️", emoji: "🎄" },
    { text: "🎅 **SPECIAL DELIVERY** from the North Pole! 🎁\n❄️ Someone made *Christmas magic* for you! Tap to unwrap! ✨", emoji: "🎅" },
    { text: "🎁 **UNDER THE TREE** there's a gift for you! 🎄\n✨ *Your personalized Christmas greeting awaits...* Click! ❄️", emoji: "🎁" },
    { text: "❄️ **WINTER WONDERLAND** greetings! ⛄\n🎄 Click here for *festive magic* made just for you! 🎅✨", emoji: "❄️" },
    { text: "🔔 **JINGLE BELLS!** 🎶 Christmas cheer is here!\n✨ *Someone created holiday magic...* Open your gift! 🎁🎄", emoji: "🔔" },
    { text: "⛄ **FROSTY SAYS HELLO!** ❄️ Christmas joy awaits!\n🎄 *Tap to unwrap* your festive surprise! 🎅🎁", emoji: "⛄" },
    { text: "🎅 **SANTA'S LIST CHECKED!** ✅ You're on it!\n✨ Click for your *special* Christmas greeting! 🎄🎁", emoji: "🎅" },
    { text: "🌟 **STAR OF BETHLEHEM!** ✨ Holiday magic inside!\n🎄 *Open now* for Christmas cheer! 🎅❄️", emoji: "🌟" },
  ],
  
  valentine: [
    { text: "💘 **CUPID CALLED!** 💖 You've got love mail!\n✨ *Click for your romantic Valentine surprise!* 💝🌹", emoji: "💘" },
    { text: "💝 **SEALED WITH A KISS** 💋 Valentine magic awaits!\n🌹 Someone made *something special* for you! Tap now! ✨", emoji: "💝" },
    { text: "🌹 **ROSES & ROMANCE!** 💕 Love is in the air!\n✨ *Your Valentine greeting is ready...* Click to feel the love! 💖", emoji: "🌹" },
    { text: "💖 **BE MY VALENTINE!** 💘 Sweet surprise inside!\n✨ Click here for *romantic magic* made just for you! 💝", emoji: "💖" },
    { text: "💕 **LOVE LETTER ALERT!** 💌 Someone's thinking of you!\n🌹 *Open this for Valentine sweetness!* ✨💖", emoji: "💕" },
    { text: "💋 **XOXO!** 💖 Valentine wishes just for you!\n✨ *Tap here* for romantic surprise! 💝🌹", emoji: "💋" },
    { text: "💌 **LOVE NOTE DELIVERED!** 💕 Special someone awaits!\n🌹 *Click to read* your heartfelt message! ✨💖", emoji: "💌" },
    { text: "💝 **CUPID'S ARROW STRUCK!** 💘 Love is calling!\n✨ Open for *Valentine magic* made with love! 💖🌹", emoji: "💝" },
  ],
  
  thanksgiving: [
    { text: "🦃 **GOBBLE GOBBLE!** 🍂 Thanksgiving blessings!\n✨ Click for your *special* gratitude greeting! 🍁🥧", emoji: "🦃" },
    { text: "🍁 **THANKFUL VIBES** coming your way! 🦃\n✨ Someone made *Thanksgiving magic* for you! Tap here! 🥧", emoji: "🍁" },
    { text: "🥧 **FEAST YOUR EYES** on this surprise! 🍂\n✨ *Your Thanksgiving greeting awaits...* Click to celebrate! 🦃", emoji: "🥧" },
    { text: "🍂 **HARVEST BLESSINGS** for you! 🦃\n✨ Click here for *grateful magic* crafted specially! 🍁🥧", emoji: "🍂" },
    { text: "🦃 **GRATEFUL HEARTS!** 💛 Thanksgiving joy awaits!\n✨ *Someone created thankful magic...* Open now! 🍂🥧", emoji: "🦃" },
    { text: "🍽️ **TURKEY TIME!** 🦃 Thanksgiving cheer is here!\n✨ *Tap to see* your special gratitude message! 🍁", emoji: "🍽️" },
    { text: "💛 **COUNTING BLESSINGS!** 🍂 You're one of them!\n🦃 *Click here* for Thanksgiving surprise! 🥧✨", emoji: "💛" },
    { text: "🍁 **FALL FESTIVITIES!** 🦃 Grateful vibes await!\n✨ Open your *Thanksgiving greeting* now! 🍂🥧", emoji: "🍁" },
  ],
  
  default: [
    { text: "✨ **SURPRISE!** Someone made something *AMAZING* for you! 🎉\n💝 *Click here* to see your special greeting! 🌟", emoji: "✨" },
    { text: "🎊 **YOU'VE GOT MAIL!** 💌 But better! 😊\n✨ Someone crafted *magic* just for you! Tap to open! 🎁", emoji: "🎊" },
    { text: "🌟 **SPECIAL DELIVERY!** 🎁 Your surprise awaits!\n✨ *Click to unwrap this beautiful greeting!* 💝", emoji: "🌟" },
    { text: "💝 **MADE WITH LOVE!** ✨ A gift in every click!\n🎉 *Someone created something special...* Open here! 🌟", emoji: "💝" },
    { text: "🎁 **GOOD VIBES INCOMING!** ⚡ Ready for a smile?\n✨ *Your personalized surprise is waiting...* Click now! 💝", emoji: "🎁" },
    { text: "🎉 **SOMETHING SPECIAL!** ✨ Just for you!\n💝 *Tap here* to see what magic awaits! 🌟🎁", emoji: "🎉" },
    { text: "💫 **MAGIC MOMENT!** ✨ Your surprise is ready!\n🎁 Someone created *something beautiful...* Click! 💝", emoji: "💫" },
    { text: "🌈 **HAPPINESS ALERT!** 🎊 Special wishes inside!\n✨ *Open now* for your personalized greeting! 💝🎁", emoji: "🌈" },
    { text: "⭐ **WISH UPON A STAR!** ✨ Dreams come true here!\n💝 *Click to unwrap* your special message! 🎉", emoji: "⭐" },
    { text: "🎈 **CELEBRATION TIME!** 🎊 Joy awaits you!\n✨ Someone made *magic* just for you... Open here! 💝", emoji: "🎈" },
    { text: "💌 **HEARTFELT MESSAGE!** 💖 Special delivery!\n✨ *Tap here* to see something wonderful! 🎁🌟", emoji: "💌" },
    { text: "🎀 **WRAPPED WITH CARE!** 🎁 Your surprise is here!\n✨ Click to unwrap *beautiful memories!* 💝🎊", emoji: "🎀" },
    { text: "🌟 **SHINING MOMENT!** ✨ Made just for you!\n💝 *Open this* for something truly special! 🎉🎁", emoji: "🌟" },
    { text: "🎊 **JOY DELIVERY!** 💫 Happiness in a click!\n✨ Someone created *magic* for you... Tap now! 💝", emoji: "🎊" },
    { text: "💖 **WITH LOVE!** ✨ Special wishes await!\n🎁 *Click here* to receive your heartfelt greeting! 🌟", emoji: "💖" },
  ],
};

/**
 * Get a random catchy share text for the given event type
 */
export function getRandomShareText(eventType: string): ShareText {
  const eventTexts = shareTexts[eventType.toLowerCase()] || shareTexts.default;
  const randomIndex = Math.floor(Math.random() * eventTexts.length);
  return eventTexts[randomIndex];
}

/**
 * Generate formatted share text with URL
 */
export function generateShareMessage(eventType: string, url: string): string {
  const shareText = getRandomShareText(eventType);
  return `${shareText.text}\n\n👉 ${url}`;
}
