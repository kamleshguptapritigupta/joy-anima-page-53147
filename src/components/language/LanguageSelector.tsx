import { motion } from "framer-motion";
import { useLanguageTranslation } from "@/components/language/useLanguageTranslation";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

export default function LanguageSelector() {
  const { currentLanguage, changeLanguage, languages } = useLanguageTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{
        scale: 1.02,
        boxShadow: "0 0 20px rgba(139, 92, 246, 0.4)", // purple glow
      }}
      className="inline-block"
    >
      <Select value={currentLanguage.code} onValueChange={changeLanguage}>
        <SelectTrigger
          className="
            w-[180px]
            bg-white/70 dark:bg-gray-900/70
            backdrop-blur-md
            text-gray-900 dark:text-gray-100
            border border-gray-200/50 dark:border-gray-700/60
            hover:border-primary focus:border-primary
            transition-all duration-300
            shadow-sm hover:shadow-md
            rounded-xl
          "
        >
          <SelectValue placeholder="Select language" />
        </SelectTrigger>

        <SelectContent
          className="
            bg-white/80 dark:bg-gray-900/90
            backdrop-blur-md
            border border-gray-200/50 dark:border-gray-700/60
            shadow-xl rounded-lg overflow-hidden
          "
        >
          {languages.map((lang) => (
            <motion.div
              key={lang.code}
              whileHover={{ scale: 1.05, x: 4 }}
              transition={{ type: "spring", stiffness: 200, damping: 12 }}
            >
              <SelectItem
                value={lang.code}
                className="
                  flex items-center gap-2 px-3 py-2 cursor-pointer
                  text-gray-900 dark:text-gray-100
                  hover:bg-primary/10 dark:hover:bg-primary/20
                  transition-all
                "
              >
                <motion.span
                  whileHover={{ rotate: 10 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  {lang.flag}
                </motion.span>
                {lang.name}
              </SelectItem>
            </motion.div>
          ))}
        </SelectContent>
      </Select>
    </motion.div>
  );
}
