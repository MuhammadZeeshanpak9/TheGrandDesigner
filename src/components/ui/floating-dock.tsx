"use client";

// NOTE: this component intentionally uses raw `motion.*`/`AnimatePresence`
// from "framer-motion" rather than the lazy `m.*` variant, even though the
// app wraps everything in <LazyMotion features={domAnimation}>. This is a
// deliberate choice (ported as-is from the Aceternity reference) and will
// trigger a dev-only LazyMotion console warning — do not "fix" this by
// half-converting to `m.*`.

import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import {
  AnimatePresence,
  type MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";

export type FloatingDockItem = {
  title: string;
  icon: React.ReactNode;
  href: string;
  /** If provided, clicking/tapping this item calls this instead of navigating. */
  onTrigger?: () => void;
  /** Desktop hover enter/leave, piggybacked on the icon container's existing mouse listeners. */
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
  /** Keyboard handler appended to the item's existing onKeyDown behavior. */
  onKeyDown?: (e: React.KeyboardEvent<HTMLAnchorElement>) => void;
  /** Extra ARIA attributes merged onto the anchor (e.g. aria-haspopup/aria-expanded). */
  ariaProps?: React.AriaAttributes;
  /** Captures the live DOM node of this item's anchor for external positioning (e.g. dropdown anchor). */
  onContainerRef?: (el: HTMLAnchorElement | null) => void;
  /** Set false to keep the expanded mobile row open after tapping (e.g. a submenu trigger). Defaults to true. */
  closeMobileOnTrigger?: boolean;
};

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
}: {
  items: FloatingDockItem[];
  desktopClassName?: string;
  mobileClassName?: string;
}) => {
  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} />
      <FloatingDockMobile items={items} className={mobileClassName} />
    </>
  );
};

const FloatingDockMobile = ({
  items,
  className,
}: {
  items: FloatingDockItem[];
  className?: string;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={cn("relative flex flex-col items-center md:hidden", className)}>
      <AnimatePresence mode="wait" initial={false}>
        {open ? (
          <motion.div
            key="row"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="flex items-center gap-3 rounded-full bg-ink/90 backdrop-blur-xl border border-gold/40 px-4 py-3 shadow-[0_8px_32px_rgba(184,145,47,0.2)]"
          >
            {items.map((item) => (
              <a
                href={item.href}
                key={item.title}
                ref={(el) => item.onContainerRef?.(el)}
                aria-label={item.title}
                onClick={(e) => {
                  if (item.onTrigger) {
                    e.preventDefault();
                    item.onTrigger();
                  }
                  if (item.closeMobileOnTrigger !== false) setOpen(false);
                }}
                {...item.ariaProps}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/10 border border-gold/30"
              >
                <div className="h-4 w-4 text-gold">{item.icon}</div>
              </a>
            ))}
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/10 border border-gold/30"
            >
              <Menu className="h-5 w-5 text-gold" />
            </button>
          </motion.div>
        ) : (
          <motion.button
            key="toggle"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={() => setOpen(true)}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-ink/90 backdrop-blur-xl border border-gold/40 shadow-[0_8px_32px_rgba(184,145,47,0.2)]"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5 text-gold" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

const FloatingDockDesktop = ({
  items,
  className,
}: {
  items: FloatingDockItem[];
  className?: string;
}) => {
  const mouseX = useMotionValue(Infinity);
  return (
    <motion.div
      onMouseMove={(e: React.MouseEvent<HTMLDivElement>) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto hidden h-20 items-end gap-6 rounded-2xl bg-ink/90 backdrop-blur-xl border border-gold/40 px-6 pb-4 shadow-[0_8px_32px_rgba(184,145,47,0.2)] md:flex",
        className,
      )}
    >
      {items.map((item) => (
        <IconContainer mouseX={mouseX} key={item.title} item={item} />
      ))}
    </motion.div>
  );
};

function IconContainer({
  mouseX,
  item,
}: {
  mouseX: MotionValue<number>;
  item: FloatingDockItem;
}) {
  const { title, icon, href } = item;
  const ref = useRef<HTMLDivElement>(null);
  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });
  const widthTransform = useTransform(distance, [-150, 0, 150], [52, 96, 52]);
  const heightTransform = useTransform(distance, [-150, 0, 150], [52, 96, 52]);
  const widthTransformIcon = useTransform(distance, [-150, 0, 150], [26, 48, 26]);
  const heightTransformIcon = useTransform(distance, [-150, 0, 150], [26, 48, 26]);
  const width = useSpring(widthTransform, { mass: 0.1, stiffness: 150, damping: 12 });
  const height = useSpring(heightTransform, { mass: 0.1, stiffness: 150, damping: 12 });
  const widthIcon = useSpring(widthTransformIcon, { mass: 0.1, stiffness: 150, damping: 12 });
  const heightIcon = useSpring(heightTransformIcon, { mass: 0.1, stiffness: 150, damping: 12 });
  const [hovered, setHovered] = useState(false);

  const setContainerRef = (el: HTMLAnchorElement | null) => {
    item.onContainerRef?.(el);
  };

  return (
    <a
      href={href}
      ref={setContainerRef}
      aria-label={title}
      onClick={(e) => {
        if (item.onTrigger) {
          e.preventDefault();
          item.onTrigger();
        }
      }}
      onKeyDown={item.onKeyDown}
      {...item.ariaProps}
    >
      <motion.div
        ref={ref}
        style={{ width, height }}
        onMouseEnter={() => {
          setHovered(true);
          item.onHoverStart?.();
        }}
        onMouseLeave={() => {
          setHovered(false);
          item.onHoverEnd?.();
        }}
        className="relative flex aspect-square items-center justify-center rounded-full bg-gold/10 border border-gold/30"
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 2, x: "-50%" }}
              className="absolute -top-10 left-1/2 w-fit rounded-md border border-gold/40 bg-ink/95 backdrop-blur-md px-2 py-0.5 text-xs whitespace-pre text-gold shadow-lg"
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          style={{ width: widthIcon, height: heightIcon }}
          className="flex items-center justify-center text-gold"
        >
          {icon}
        </motion.div>
      </motion.div>
    </a>
  );
}

export default FloatingDock;
