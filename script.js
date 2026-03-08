// ============================================================
//  GARAGE SORT GAME  –  50 levels, combo system, stars, particles
// ============================================================

// Счётчик пройденных уровней (для рекламы)
let completedLevelsCount = 0;

// ===== TOOL DEFINITIONS =====
const TOOLS = {
    wrench: {
        id: 'wrench', name: 'Гаечный ключ', image: 'images/wrench.png',
        svgIcon: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><g transform="rotate(-35,32,32)"><rect x="28" y="20" width="8" height="30" rx="4" fill="#b0b8c1"/><rect x="29" y="21" width="3" height="28" rx="2" fill="#d5dde5"/><path d="M20 14 Q20 6 28 6 L36 6 Q44 6 44 14 L44 20 L20 20 Z" fill="#95a5a6"/><path d="M24 14 Q24 10 28 10 L36 10 Q40 10 40 14 L40 20 L24 20 Z" fill="#b0b8c1"/><rect x="26" y="6" width="12" height="8" rx="1" fill="#3d4a56"/><path d="M20 50 Q20 58 28 58 L36 58 Q44 58 44 50 L44 44 L20 44 Z" fill="#95a5a6"/><path d="M24 50 Q24 54 28 54 L36 54 Q40 54 40 50 L40 44 L24 44 Z" fill="#b0b8c1"/><rect x="26" y="50" width="12" height="8" rx="1" fill="#3d4a56"/></g></svg>`
    },
    screwdriver: {
        id: 'screwdriver', name: 'Отвёртка', image: 'images/screwdriver.png',
        svgIcon: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><rect x="22" y="4" width="20" height="28" rx="8" fill="#e67e22"/><rect x="25" y="5" width="6" height="26" rx="4" fill="#f39c12"/><rect x="22" y="12" width="20" height="3" rx="1" fill="#d35400" opacity="0.5"/><rect x="22" y="18" width="20" height="3" rx="1" fill="#d35400" opacity="0.5"/><rect x="22" y="24" width="20" height="3" rx="1" fill="#d35400" opacity="0.5"/><rect x="24" y="30" width="16" height="6" rx="2" fill="#7f8c8d"/><rect x="30" y="34" width="4" height="22" rx="1" fill="#bdc3c7"/><rect x="31" y="35" width="1.5" height="20" fill="#ecf0f1"/><polygon points="28,56 36,56 34,62 30,62" fill="#7f8c8d"/><rect x="29" y="58" width="6" height="2" fill="#636e72"/></svg>`
    },
    hammer: {
        id: 'hammer', name: 'Молоток', image: 'images/hammer.png',
        svgIcon: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><rect x="29" y="28" width="6" height="32" rx="3" fill="#8B4513"/><rect x="30" y="29" width="2" height="30" rx="1" fill="#a0522d"/><rect x="14" y="14" width="36" height="18" rx="5" fill="#7f8c8d"/><rect x="15" y="15" width="12" height="6" rx="2" fill="#95a5a6"/><rect x="14" y="14" width="10" height="18" rx="4" fill="#636e72"/><ellipse cx="19" cy="23" rx="4" ry="5" fill="#7f8c8d"/><path d="M46 18 Q58 14 58 10 Q56 8 52 12 L50 16" fill="#636e72"/><path d="M46 26 Q58 30 58 34 Q56 36 52 32 L50 28" fill="#636e72"/><ellipse cx="32" cy="23" rx="4" ry="5" fill="#3d4a56"/><ellipse cx="32" cy="23" rx="2.5" ry="3.5" fill="#8B4513"/></svg>`
    },
    pliers: {
        id: 'pliers', name: 'Плоскогубцы', image: 'images/pliers.png',
        svgIcon: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><path d="M18 8 L30 28 L26 30 L14 10 Z" fill="#7f8c8d"/><path d="M18 8 L22 8 L32 28 L30 28 Z" fill="#95a5a6"/><path d="M46 8 L34 28 L38 30 L50 10 Z" fill="#7f8c8d"/><path d="M46 8 L42 8 L32 28 L34 28 Z" fill="#95a5a6"/><circle cx="32" cy="30" r="5" fill="#636e72"/><circle cx="32" cy="30" r="2.5" fill="#95a5a6"/><path d="M26 30 L20 56 Q18 60 22 60 Q26 60 27 56 L32 34 Z" fill="#e74c3c"/><path d="M38 30 L44 56 Q46 60 42 60 Q38 60 37 56 L32 34 Z" fill="#e74c3c"/></svg>`
    },
    tape: {
        id: 'tape', name: 'Изолента', image: 'images/tape.png',
        svgIcon: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><circle cx="32" cy="32" r="26" fill="#1a1a2e"/><circle cx="32" cy="32" r="26" fill="none" stroke="#e74c3c" stroke-width="10"/><circle cx="32" cy="32" r="21" fill="none" stroke="#c0392b" stroke-width="2"/><circle cx="32" cy="32" r="12" fill="#2c2c3e"/><circle cx="32" cy="32" r="10" fill="#1a1a2e"/><path d="M20 16 Q32 10 44 16" stroke="rgba(255,255,255,0.2)" stroke-width="3" fill="none"/><path d="M50 22 L58 18 L56 26 Z" fill="#e74c3c"/></svg>`
    },
    drill: {
        id: 'drill', name: 'Дрель', image: null,
        svgIcon: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="18" width="36" height="22" rx="8" fill="#2471a3"/><rect x="7" y="19" width="14" height="10" rx="4" fill="#2980b9"/><rect x="40" y="24" width="14" height="10" rx="3" fill="#7f8c8d"/><rect x="52" y="27" width="10" height="4" rx="1" fill="#bdc3c7"/><polygon points="60,27 64,29 60,31" fill="#95a5a6"/><path d="M14 38 Q10 46 14 52 L26 52 Q30 52 30 48 L30 38 Z" fill="#1a5276"/><rect x="18" y="40" width="8" height="10" rx="3" fill="#e67e22"/><rect x="14" y="50" width="20" height="10" rx="4" fill="#1a5276"/></svg>`
    },
    saw: {
        id: 'saw', name: 'Ножовка', image: null,
        svgIcon: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><path d="M4 20 Q4 10 12 10 L22 10 Q26 10 26 16 L26 36 Q26 42 20 42 L10 42 Q4 42 4 36 Z" fill="#8B4513"/><path d="M8 14 Q8 12 12 12 L20 12 Q22 12 22 16 L22 36 Q22 38 18 38 L10 38 Q8 38 8 36 Z" fill="#a0522d"/><ellipse cx="15" cy="26" rx="5" ry="8" fill="#6b3410"/><path d="M22 20 L60 16 L60 28 L22 32 Z" fill="#bdc3c7"/><path d="M23 21 L59 17 L59 19 L23 23 Z" fill="#d5dde5"/><path d="M28 32 L30 38 L32 32 L34 38 L36 32 L38 38 L40 32 L42 38 L44 32 L46 38 L48 32 L50 38 L52 32 L54 38 L56 32 L58 38 L60 28" fill="#95a5a6"/></svg>`
    },
    chisel: {
        id: 'chisel', name: 'Стамеска', image: null,
        svgIcon: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><rect x="24" y="4" width="16" height="24" rx="6" fill="#8B4513"/><rect x="26" y="5" width="5" height="22" rx="3" fill="#a0522d"/><rect x="22" y="26" width="20" height="6" rx="2" fill="#7f8c8d"/><rect x="26" y="30" width="12" height="24" rx="1" fill="#bdc3c7"/><rect x="27" y="31" width="4" height="22" fill="#d5dde5"/><polygon points="26,54 38,54 36,62 28,62" fill="#95a5a6"/><line x1="26" y1="54" x2="38" y2="54" stroke="#636e72" stroke-width="1.5"/></svg>`
    },
    socket: {
        id: 'socket', name: 'Торцевой ключ', image: null,
        svgIcon: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><rect x="26" y="4" width="12" height="30" rx="5" fill="#e67e22"/><rect x="28" y="5" width="4" height="28" rx="3" fill="#f39c12"/><circle cx="32" cy="38" r="12" fill="#7f8c8d"/><circle cx="32" cy="38" r="10" fill="#95a5a6"/><circle cx="32" cy="38" r="7" fill="#636e72"/><rect x="28" y="46" width="8" height="14" rx="2" fill="#7f8c8d"/><circle cx="32" cy="38" r="4" fill="#7f8c8d"/><circle cx="32" cy="38" r="2" fill="#bdc3c7"/></svg>`
    },
    hexkey: {
        id: 'hexkey', name: 'Шестигранник', image: null,
        svgIcon: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><rect x="29" y="18" width="6" height="40" rx="3" fill="#3498db"/><rect x="30" y="19" width="2" height="38" rx="1" fill="#5dade2"/><rect x="18" y="10" width="28" height="6" rx="3" fill="#3498db"/><rect x="19" y="11" width="26" height="2" rx="1" fill="#5dade2"/><rect x="29" y="10" width="6" height="12" rx="2" fill="#2980b9"/><polygon points="32,56 29,58 26,56 26,52 29,50 32,52" fill="#2471a3"/><polygon points="32,56 35,58 38,56 38,52 35,50 32,52" fill="#2980b9"/></svg>`
    },
    knife: {
        id: 'knife', name: 'Строительный нож', image: null,
        svgIcon: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="24" width="40" height="16" rx="5" fill="#e74c3c"/><rect x="7" y="25" width="16" height="6" rx="3" fill="#ec7063"/><rect x="40" y="27" width="18" height="10" rx="2" fill="#bdc3c7"/><polygon points="44,28 62,30 62,34 44,36 46,32" fill="#d5dde5"/><polygon points="56,30 62,30 62,34 56,34" fill="#95a5a6"/><rect x="22" y="22" width="10" height="6" rx="3" fill="#c0392b"/></svg>`
    },
    stripper: {
        id: 'stripper', name: 'Стриппер', image: null,
        svgIcon: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><path d="M8 36 L28 32 L28 36 L8 44 Q4 44 4 40 Q4 36 8 36 Z" fill="#27ae60"/><path d="M8 24 L28 24 L28 28 L8 28 Q4 28 4 24 Q4 20 8 20 L8 24 Z" fill="#27ae60"/><circle cx="30" cy="32" r="4" fill="#7f8c8d"/><circle cx="30" cy="32" r="2" fill="#95a5a6"/><path d="M28 24 L52 20 L52 28 L28 32 Z" fill="#95a5a6"/><path d="M28 32 L52 36 L52 44 L28 36 Z" fill="#95a5a6"/><circle cx="36" cy="28" r="2" fill="#636e72"/><circle cx="42" cy="27" r="2.5" fill="#636e72"/><circle cx="48" cy="26" r="3" fill="#636e72"/></svg>`
    },
    clamp: {
        id: 'clamp', name: 'Струбцина', image: null,
        svgIcon: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><path d="M14 8 Q8 8 8 16 L8 48 Q8 56 14 56 L22 56 L22 50 L16 50 Q14 50 14 48 L14 16 Q14 14 16 14 L22 14 L22 8 Z" fill="#7f8c8d"/><rect x="14" y="8" width="36" height="10" rx="3" fill="#7f8c8d"/><rect x="14" y="50" width="36" height="8" rx="3" fill="#7f8c8d"/><rect x="38" y="16" width="8" height="36" rx="4" fill="#636e72"/><line x1="38" y1="22" x2="46" y2="22" stroke="#4a4a4a" stroke-width="1.5"/><line x1="38" y1="28" x2="46" y2="28" stroke="#4a4a4a" stroke-width="1.5"/><line x1="38" y1="34" x2="46" y2="34" stroke="#4a4a4a" stroke-width="1.5"/><line x1="38" y1="40" x2="46" y2="40" stroke="#4a4a4a" stroke-width="1.5"/><rect x="34" y="14" width="16" height="4" rx="2" fill="#95a5a6"/></svg>`
    },
    mallet: {
        id: 'mallet', name: 'Киянка', image: null,
        svgIcon: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><rect x="8" y="10" width="40" height="26" rx="8" fill="#2c3e50"/><rect x="9" y="11" width="16" height="10" rx="4" fill="#34495e"/><rect x="8" y="10" width="12" height="26" rx="6" fill="#1a252f"/><rect x="44" y="10" width="12" height="26" rx="6" fill="#1a252f"/><ellipse cx="32" cy="23" rx="5" ry="7" fill="#1a252f"/><rect x="28" y="30" width="8" height="28" rx="4" fill="#8B4513"/><rect x="29" y="31" width="3" height="26" rx="2" fill="#a0522d"/></svg>`
    },
    file_tool: {
        id: 'file_tool', name: 'Напильник', image: null,
        svgIcon: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><rect x="24" y="4" width="16" height="20" rx="6" fill="#8B4513"/><rect x="26" y="5" width="5" height="18" rx="3" fill="#a0522d"/><rect x="22" y="22" width="20" height="6" rx="2" fill="#7f8c8d"/><rect x="26" y="26" width="12" height="32" rx="2" fill="#95a5a6"/><rect x="27" y="27" width="4" height="30" rx="1" fill="#bdc3c7"/><line x1="26" y1="30" x2="38" y2="30" stroke="#636e72" stroke-width="1.2"/><line x1="26" y1="34" x2="38" y2="34" stroke="#636e72" stroke-width="1.2"/><line x1="26" y1="38" x2="38" y2="38" stroke="#636e72" stroke-width="1.2"/><line x1="26" y1="42" x2="38" y2="42" stroke="#636e72" stroke-width="1.2"/><line x1="26" y1="46" x2="38" y2="46" stroke="#636e72" stroke-width="1.2"/><polygon points="26,56 38,56 35,62 29,62" fill="#7f8c8d"/></svg>`
    },
    staplegun: {
        id: 'staplegun', name: 'Степлер', image: null,
        svgIcon: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="16" width="44" height="22" rx="7" fill="#8e44ad"/><rect x="7" y="17" width="18" height="10" rx="4" fill="#9b59b6"/><rect x="46" y="20" width="12" height="14" rx="4" fill="#7d3c98"/><rect x="50" y="30" width="8" height="3" rx="1" fill="#2c3e50"/><path d="M10 36 Q6 44 8 52 L28 52 Q32 52 32 48 L32 36 Z" fill="#6c3483"/><rect x="16" y="38" width="10" height="12" rx="4" fill="#e67e22"/><rect x="8" y="36" width="38" height="6" rx="2" fill="#5b2c6f"/></svg>`
    },
    caulkgun: {
        id: 'caulkgun', name: 'Пистолет для герметика', image: null,
        svgIcon: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="18" width="36" height="14" rx="6" fill="#d5d8dc"/><rect x="11" y="19" width="12" height="6" rx="3" fill="#ecf0f1"/><ellipse cx="46" cy="25" rx="6" ry="7" fill="#bdc3c7"/><path d="M10 22 L4 24 L4 26 L10 28 Z" fill="#95a5a6"/><path d="M14 30 L14 52 Q14 56 18 56 L22 56 Q26 56 26 52 L26 30 Z" fill="#7f8c8d"/><rect x="26" y="23" width="20" height="4" rx="2" fill="#636e72"/><rect x="44" y="20" width="4" height="10" rx="2" fill="#7f8c8d"/><rect x="16" y="38" width="8" height="14" rx="4" fill="#e67e22"/></svg>`
    },
    heatgun: {
        id: 'heatgun', name: 'Термофен', image: null,
        svgIcon: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="16" width="34" height="22" rx="8" fill="#c0392b"/><rect x="7" y="17" width="14" height="10" rx="4" fill="#e74c3c"/><rect x="38" y="20" width="20" height="14" rx="4" fill="#7f8c8d"/><ellipse cx="58" cy="27" rx="3" ry="5" fill="#636e72"/><path d="M58 22 Q62 24 58 27" stroke="#f39c12" stroke-width="2" fill="none"/><path d="M58 27 Q62 30 58 32" stroke="#e67e22" stroke-width="2" fill="none"/><path d="M12 36 Q8 44 10 52 L24 52 Q28 52 28 48 L28 36 Z" fill="#922b21"/><rect x="14" y="40" width="8" height="10" rx="3" fill="#e67e22"/></svg>`
    },
    multimeter: {
        id: 'multimeter', name: 'Мультиметр', image: null,
        svgIcon: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="6" width="44" height="52" rx="8" fill="#2c3e50"/><rect x="14" y="10" width="36" height="18" rx="4" fill="#1abc9c"/><text x="18" y="24" font-family="monospace" font-size="10" fill="#ecf0f1" font-weight="bold">12.5V</text><circle cx="32" cy="40" r="10" fill="#34495e"/><circle cx="32" cy="40" r="8" fill="#2c3e50"/><line x1="32" y1="32" x2="32" y2="35" stroke="#e74c3c" stroke-width="1.5"/><line x1="40" y1="40" x2="37" y2="40" stroke="#f1c40f" stroke-width="1.5"/><line x1="32" y1="40" x2="38" y2="34" stroke="#e74c3c" stroke-width="2"/><circle cx="32" cy="40" r="2" fill="#e74c3c"/><circle cx="24" cy="54" r="3" fill="#e74c3c"/><circle cx="40" cy="54" r="3" fill="#2c3e50" stroke="#95a5a6" stroke-width="1"/></svg>`
    },
    tapemeasure: {
        id: 'tapemeasure', name: 'Рулетка', image: null,
        svgIcon: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><rect x="8" y="12" width="40" height="36" rx="10" fill="#f39c12"/><rect x="9" y="13" width="16" height="14" rx="6" fill="#f5b041"/><rect x="44" y="16" width="6" height="28" rx="3" fill="#e67e22"/><rect x="8" y="28" width="14" height="8" rx="2" fill="#d35400"/><rect x="4" y="30" width="18" height="4" rx="1" fill="#f1c40f"/><line x1="8" y1="30" x2="8" y2="34" stroke="#2c3e50" stroke-width="1"/><line x1="12" y1="30" x2="12" y2="33" stroke="#2c3e50" stroke-width="0.8"/><line x1="16" y1="30" x2="16" y2="34" stroke="#2c3e50" stroke-width="1"/><rect x="20" y="14" width="12" height="8" rx="4" fill="#e67e22"/></svg>`
    },
    level_tool: {
        id: 'level_tool', name: 'Уровень', image: null,
        svgIcon: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="22" width="56" height="20" rx="6" fill="#27ae60"/><rect x="5" y="23" width="22" height="8" rx="3" fill="#2ecc71"/><rect x="4" y="22" width="8" height="20" rx="4" fill="#1e8449"/><rect x="52" y="22" width="8" height="20" rx="4" fill="#1e8449"/><rect x="20" y="26" width="24" height="12" rx="4" fill="#d5f5e3" stroke="#1e8449" stroke-width="2"/><rect x="22" y="28" width="20" height="8" rx="4" fill="#a9dfbf"/><ellipse cx="32" cy="32" rx="5" ry="3" fill="rgba(255,255,255,0.7)" stroke="#27ae60" stroke-width="1"/><line x1="32" y1="26" x2="32" y2="38" stroke="#1e8449" stroke-width="1.5"/></svg>`
    }
};

// ===== LEVEL BUILDER =====
function buildLevel(slots, itemCounts, timeLimit) {
    const slotArr = slots.map(id => ({ id: `slot-${id}`, toolId: id }));
    const itemArr = [];
    itemCounts.forEach(({ toolId, count }) => {
        for (let i = 0; i < count; i++) {
            itemArr.push({ uid: `${toolId}-${i}`, toolId });
        }
    });
    return { slots: slotArr, items: itemArr, timeLimit: timeLimit || 0 };
}

// Helper to build item counts array
function ic(toolIds, count) {
    return toolIds.map(id => ({ toolId: id, count }));
}

// ===== 50 LEVELS =====
// Chapter 1: Apprentice (1-10) – no timer, 3-6 tools
// Chapter 2: Journeyman (11-25) – timer, 7-14 tools
// Chapter 3: Expert (26-40) – tighter timer, 15-18 tools
// Chapter 4: Master (41-50) – hard timer, all 21 tools, many items

const ALL_TOOLS = ['wrench','hammer','screwdriver','pliers','tape','drill','saw','chisel','socket','hexkey','knife','stripper','clamp','mallet','file_tool','staplegun','caulkgun','heatgun','multimeter','tapemeasure','level_tool'];

const LEVELS = [
    // === CHAPTER 1: APPRENTICE (1-10) ===
    // 1
    buildLevel(['wrench','hammer','screwdriver'],
        ic(['wrench','hammer','screwdriver'],1), 0),
    // 2
    buildLevel(['wrench','hammer','screwdriver'],
        [...ic(['wrench','hammer'],2), ...ic(['screwdriver'],1)], 0),
    // 3
    buildLevel(['wrench','hammer','screwdriver','pliers'],
        ic(['wrench','hammer','screwdriver','pliers'],1), 0),
    // 4
    buildLevel(['wrench','hammer','screwdriver','pliers'],
        [...ic(['wrench','hammer'],2), ...ic(['screwdriver','pliers'],1)], 0),
    // 5
    buildLevel(['wrench','hammer','screwdriver','pliers','tape'],
        ic(['wrench','hammer','screwdriver','pliers','tape'],1), 0),
    // 6
    buildLevel(['wrench','hammer','screwdriver','pliers','tape'],
        [...ic(['wrench','hammer','screwdriver'],2), ...ic(['pliers','tape'],1)], 0),
    // 7
    buildLevel(['wrench','hammer','screwdriver','pliers','tape','drill'],
        ic(['wrench','hammer','screwdriver','pliers','tape','drill'],1), 0),
    // 8
    buildLevel(['wrench','hammer','screwdriver','pliers','tape','drill'],
        [...ic(['wrench','hammer','screwdriver'],2), ...ic(['pliers','tape','drill'],1)], 0),
    // 9
    buildLevel(['wrench','hammer','screwdriver','pliers','tape','drill','saw'],
        ic(['wrench','hammer','screwdriver','pliers','tape','drill','saw'],1), 0),
    // 10
    buildLevel(['wrench','hammer','screwdriver','pliers','tape','drill','saw'],
        ic(['wrench','hammer','screwdriver','pliers','tape','drill','saw'],2), 0),

    // === CHAPTER 2: JOURNEYMAN (11-25) ===
    // 11
    buildLevel(['wrench','hammer','screwdriver','pliers','tape','drill','saw','chisel'],
        [...ic(['wrench','hammer','screwdriver','pliers'],2), ...ic(['tape','drill','saw','chisel'],1)], 120),
    // 12
    buildLevel(['wrench','hammer','screwdriver','pliers','tape','drill','saw','chisel'],
        ic(['wrench','hammer','screwdriver','pliers','tape','drill','saw','chisel'],2), 130),
    // 13
    buildLevel(['wrench','hammer','screwdriver','pliers','tape','drill','saw','chisel','socket'],
        [...ic(['wrench','hammer','screwdriver','pliers','tape'],2), ...ic(['drill','saw','chisel','socket'],1)], 140),
    // 14
    buildLevel(['wrench','hammer','screwdriver','pliers','tape','drill','saw','chisel','socket'],
        ic(['wrench','hammer','screwdriver','pliers','tape','drill','saw','chisel','socket'],2), 150),
    // 15
    buildLevel(['wrench','hammer','screwdriver','pliers','tape','drill','saw','chisel','socket','hexkey'],
        [...ic(['wrench','hammer','screwdriver','pliers','tape','drill'],2), ...ic(['saw','chisel','socket','hexkey'],1)], 160),
    // 16
    buildLevel(['wrench','hammer','screwdriver','pliers','tape','drill','saw','chisel','socket','hexkey'],
        ic(['wrench','hammer','screwdriver','pliers','tape','drill','saw','chisel','socket','hexkey'],2), 170),
    // 17
    buildLevel(['wrench','hammer','screwdriver','pliers','tape','drill','saw','chisel','socket','hexkey','knife'],
        [...ic(['wrench','hammer','screwdriver','pliers','tape','drill','saw'],2), ...ic(['chisel','socket','hexkey','knife'],1)], 180),
    // 18
    buildLevel(['wrench','hammer','screwdriver','pliers','tape','drill','saw','chisel','socket','hexkey','knife'],
        ic(['wrench','hammer','screwdriver','pliers','tape','drill','saw','chisel','socket','hexkey','knife'],2), 190),
    // 19
    buildLevel(['wrench','hammer','screwdriver','pliers','tape','drill','saw','chisel','socket','hexkey','knife','stripper'],
        [...ic(['wrench','hammer','screwdriver','pliers','tape','drill','saw','chisel'],2), ...ic(['socket','hexkey','knife','stripper'],1)], 200),
    // 20
    buildLevel(['wrench','hammer','screwdriver','pliers','tape','drill','saw','chisel','socket','hexkey','knife','stripper'],
        ic(['wrench','hammer','screwdriver','pliers','tape','drill','saw','chisel','socket','hexkey','knife','stripper'],2), 210),
    // 21
    buildLevel(['wrench','hammer','screwdriver','pliers','tape','drill','saw','chisel','socket','hexkey','knife','stripper','clamp'],
        [...ic(['wrench','hammer','screwdriver','pliers','tape','drill','saw','chisel','socket'],2), ...ic(['hexkey','knife','stripper','clamp'],1)], 220),
    // 22
    buildLevel(['wrench','hammer','screwdriver','pliers','tape','drill','saw','chisel','socket','hexkey','knife','stripper','clamp'],
        ic(['wrench','hammer','screwdriver','pliers','tape','drill','saw','chisel','socket','hexkey','knife','stripper','clamp'],2), 230),
    // 23
    buildLevel(['wrench','hammer','screwdriver','pliers','tape','drill','saw','chisel','socket','hexkey','knife','stripper','clamp','mallet'],
        [...ic(['wrench','hammer','screwdriver','pliers','tape','drill','saw','chisel','socket','hexkey'],2), ...ic(['knife','stripper','clamp','mallet'],1)], 240),
    // 24
    buildLevel(['wrench','hammer','screwdriver','pliers','tape','drill','saw','chisel','socket','hexkey','knife','stripper','clamp','mallet'],
        ic(['wrench','hammer','screwdriver','pliers','tape','drill','saw','chisel','socket','hexkey','knife','stripper','clamp','mallet'],2), 250),
    // 25
    buildLevel(['wrench','hammer','screwdriver','pliers','tape','drill','saw','chisel','socket','hexkey','knife','stripper','clamp','mallet','file_tool'],
        ic(['wrench','hammer','screwdriver','pliers','tape','drill','saw','chisel','socket','hexkey','knife','stripper','clamp','mallet','file_tool'],2), 260),

    // === CHAPTER 3: EXPERT (26-40) ===
    // 26
    buildLevel(['wrench','hammer','screwdriver','pliers','tape','drill','saw','chisel','socket','hexkey','knife','stripper','clamp','mallet','file_tool','staplegun'],
        [...ic(['wrench','hammer','screwdriver','pliers','tape','drill','saw','chisel'],2), ...ic(['socket','hexkey','knife','stripper','clamp','mallet','file_tool','staplegun'],1)], 240),
    // 27
    buildLevel(['wrench','hammer','screwdriver','pliers','tape','drill','saw','chisel','socket','hexkey','knife','stripper','clamp','mallet','file_tool','staplegun'],
        ic(['wrench','hammer','screwdriver','pliers','tape','drill','saw','chisel','socket','hexkey','knife','stripper','clamp','mallet','file_tool','staplegun'],2), 250),
    // 28
    buildLevel(['wrench','hammer','screwdriver','pliers','tape','drill','saw','chisel','socket','hexkey','knife','stripper','clamp','mallet','file_tool','staplegun','caulkgun'],
        [...ic(['wrench','hammer','screwdriver','pliers','tape','drill','saw','chisel','socket'],2), ...ic(['hexkey','knife','stripper','clamp','mallet','file_tool','staplegun','caulkgun'],1)], 260),
    // 29
    buildLevel(['wrench','hammer','screwdriver','pliers','tape','drill','saw','chisel','socket','hexkey','knife','stripper','clamp','mallet','file_tool','staplegun','caulkgun'],
        ic(['wrench','hammer','screwdriver','pliers','tape','drill','saw','chisel','socket','hexkey','knife','stripper','clamp','mallet','file_tool','staplegun','caulkgun'],2), 270),
    // 30
    buildLevel(['wrench','hammer','screwdriver','pliers','tape','drill','saw','chisel','socket','hexkey','knife','stripper','clamp','mallet','file_tool','staplegun','caulkgun','heatgun'],
        [...ic(['wrench','hammer','screwdriver','pliers','tape','drill','saw','chisel','socket','hexkey'],2), ...ic(['knife','stripper','clamp','mallet','file_tool','staplegun','caulkgun','heatgun'],1)], 270),
    // 31
    buildLevel(['wrench','hammer','screwdriver','pliers','tape','drill','saw','chisel','socket','hexkey','knife','stripper','clamp','mallet','file_tool','staplegun','caulkgun','heatgun'],
        ic(['wrench','hammer','screwdriver','pliers','tape','drill','saw','chisel','socket','hexkey','knife','stripper','clamp','mallet','file_tool','staplegun','caulkgun','heatgun'],2), 280),
    // 32
    buildLevel(['wrench','hammer','screwdriver','pliers','tape','drill','saw','chisel','socket','hexkey','knife','stripper','clamp','mallet','file_tool','staplegun','caulkgun','heatgun','multimeter'],
        [...ic(['wrench','hammer','screwdriver','pliers','tape','drill','saw','chisel','socket','hexkey','knife'],2), ...ic(['stripper','clamp','mallet','file_tool','staplegun','caulkgun','heatgun','multimeter'],1)], 280),
    // 33
    buildLevel(['wrench','hammer','screwdriver','pliers','tape','drill','saw','chisel','socket','hexkey','knife','stripper','clamp','mallet','file_tool','staplegun','caulkgun','heatgun','multimeter'],
        ic(['wrench','hammer','screwdriver','pliers','tape','drill','saw','chisel','socket','hexkey','knife','stripper','clamp','mallet','file_tool','staplegun','caulkgun','heatgun','multimeter'],2), 290),
    // 34
    buildLevel(ALL_TOOLS.slice(0,20),
        [...ic(ALL_TOOLS.slice(0,12),2), ...ic(ALL_TOOLS.slice(12,20),1)], 290),
    // 35
    buildLevel(ALL_TOOLS.slice(0,20),
        ic(ALL_TOOLS.slice(0,20),2), 300),
    // 36
    buildLevel(ALL_TOOLS,
        [...ic(ALL_TOOLS.slice(0,14),2), ...ic(ALL_TOOLS.slice(14),1)], 300),
    // 37
    buildLevel(ALL_TOOLS,
        ic(ALL_TOOLS,2), 310),
    // 38
    buildLevel(ALL_TOOLS,
        [...ic(ALL_TOOLS.slice(0,10),3), ...ic(ALL_TOOLS.slice(10),2)], 310),
    // 39
    buildLevel(ALL_TOOLS,
        [...ic(ALL_TOOLS.slice(0,15),3), ...ic(ALL_TOOLS.slice(15),2)], 320),
    // 40
    buildLevel(ALL_TOOLS,
        ic(ALL_TOOLS,3), 320),

    // === CHAPTER 4: MASTER (41-50) ===
    // 41
    buildLevel(ALL_TOOLS,
        [...ic(ALL_TOOLS.slice(0,7),4), ...ic(ALL_TOOLS.slice(7),3)], 300),
    // 42
    buildLevel(ALL_TOOLS,
        [...ic(ALL_TOOLS.slice(0,14),4), ...ic(ALL_TOOLS.slice(14),3)], 300),
    // 43
    buildLevel(ALL_TOOLS,
        ic(ALL_TOOLS,4), 300),
    // 44
    buildLevel(ALL_TOOLS,
        [...ic(ALL_TOOLS.slice(0,7),5), ...ic(ALL_TOOLS.slice(7),4)], 290),
    // 45
    buildLevel(ALL_TOOLS,
        [...ic(ALL_TOOLS.slice(0,14),5), ...ic(ALL_TOOLS.slice(14),4)], 290),
    // 46
    buildLevel(ALL_TOOLS,
        ic(ALL_TOOLS,5), 290),
    // 47
    buildLevel(ALL_TOOLS,
        [...ic(ALL_TOOLS.slice(0,7),6), ...ic(ALL_TOOLS.slice(7),5)], 280),
    // 48
    buildLevel(ALL_TOOLS,
        [...ic(ALL_TOOLS.slice(0,14),6), ...ic(ALL_TOOLS.slice(14),5)], 280),
    // 49
    buildLevel(ALL_TOOLS,
        ic(ALL_TOOLS,6), 280),
    // 50 – FINAL MASTER
    buildLevel(ALL_TOOLS,
        ic(ALL_TOOLS,7), 300),
];

// Chapter metadata
const CHAPTERS = [
    { name: 'УЧЕНИК',    color: '#27ae60', levels: [1,10]  },
    { name: 'ПОДМАСТЕРЬЕ', color: '#2980b9', levels: [11,25] },
    { name: 'ЭКСПЕРТ',   color: '#e67e22', levels: [26,40] },
    { name: 'МАСТЕР',    color: '#e74c3c', levels: [41,50] },
];

function getChapter(levelIndex) {
    const n = levelIndex + 1;
    return CHAPTERS.find(c => n >= c.levels[0] && n <= c.levels[1]) || CHAPTERS[0];
}

// ===== STATE =====
let currentLevel = 0;
let score = 0;
let combo = 0;
let mistakes = 0;
let itemPool = [];
let heldItem = null;
let timerInterval = null;
let timeLeft = 0;
let levelStartTime = 0;

// ===== ACHIEVEMENTS =====
const ACHIEVEMENTS_DEF = [
    { id: 'first_correct',   icon: '🔧', name: 'Первый шаг',       desc: 'Правильно разместить первый инструмент' },
    { id: 'combo3',          icon: '🔥', name: 'Тройное комбо',    desc: 'Сделать комбо x3' },
    { id: 'combo5',          icon: '💥', name: 'Пятикратное комбо',desc: 'Сделать комбо x5' },
    { id: 'no_mistakes_lvl', icon: '⭐', name: 'Без ошибок',       desc: 'Пройти уровень без единой ошибки' },
    { id: 'speed_run',       icon: '⚡', name: 'Молния',           desc: 'Пройти уровень за половину отведённого времени' },
    { id: 'chapter2',        icon: '🔵', name: 'Подмастерье',      desc: 'Дойти до главы «Подмастерье»' },
    { id: 'chapter3',        icon: '🟠', name: 'Эксперт',          desc: 'Дойти до главы «Эксперт»' },
    { id: 'chapter4',        icon: '🔴', name: 'Мастер',           desc: 'Дойти до главы «Мастер»' },
    { id: 'level25',         icon: '🥈', name: 'Полпути',          desc: 'Пройти 25 уровней' },
    { id: 'level50',         icon: '🥇', name: 'Легенда гаража',   desc: 'Пройти все 50 уровней' },
    { id: 'score1000',       icon: '💰', name: 'Тысячник',         desc: 'Набрать 1000 очков' },
];

let unlockedAchievements = new Set();

function unlockAchievement(id) {
    if (unlockedAchievements.has(id)) return;
    unlockedAchievements.add(id);
    saveProgress();
    const def = ACHIEVEMENTS_DEF.find(a => a.id === id);
    if (def) showAchievementToast(def);
}

function showAchievementToast(def) {
    const toast = document.createElement('div');
    toast.className = 'achievement-toast';
    toast.innerHTML = `<span class="ach-icon">${def.icon}</span><div><div class="ach-name">${def.name}</div><div class="ach-desc">${def.desc}</div></div>`;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add('toast-show'), 50);
    setTimeout(() => { toast.classList.remove('toast-show'); setTimeout(() => toast.remove(), 400); }, 3500);
}

// ===== LEADERBOARD =====
function getLeaderboard() {
    try { return JSON.parse(localStorage.getItem('garageLeaderboard') || '[]'); } catch(e) { return []; }
}

function addLeaderboardEntry(playerScore, levelReached) {
    const lb = getLeaderboard();
    const today = new Date().toLocaleDateString('ru-RU');
    lb.push({ score: playerScore, level: levelReached, date: today });
    lb.sort((a,b) => b.score - a.score);
    lb.splice(10); // keep top 10
    try { localStorage.setItem('garageLeaderboard', JSON.stringify(lb)); } catch(e) {}
}

// ===== ЯНДЕКС ИГРЫ: СОХРАНЕНИЕ ПРОГРЕССА =====

function saveToYandex() {
    try {
        if (window.saveGameProgress) {
            window.saveGameProgress({
                level: currentLevel,
                score: score,
                achievements: [...unlockedAchievements],
                mistakes: mistakes,
                completedLevelsCount: completedLevelsCount
            });
        }
    } catch(e) {
        console.warn('Yandex save failed:', e);
    }
}

function loadFromYandex(callback) {
    // Timeout fallback - if Yandex doesn't respond in 2 seconds, use localStorage
    const timeout = setTimeout(() => {
        console.log('⏰ Yandex timeout - using localStorage');
        if (callback) callback();
    }, 1000);
    
    try {
        if (window.loadGameProgress) {
            window.loadGameProgress((data) => {
                clearTimeout(timeout);
                try {
                    if (data && typeof data === 'object') {
                        if (data.level !== undefined) currentLevel = Math.min(data.level, LEVELS.length - 1);
                        if (data.score !== undefined) score = data.score;
                        if (data.achievements) unlockedAchievements = new Set(data.achievements);
                        if (data.mistakes !== undefined) mistakes = data.mistakes;
                        if (data.completedLevelsCount !== undefined) completedLevelsCount = data.completedLevelsCount;
                        
                        // Обновляем UI
                        document.getElementById('score').innerText = score;
                        document.getElementById('mistakes-value').innerText = mistakes;
                        console.log('✅ Loaded from Yandex:', data);
                    }
                } catch(e) {
                    console.warn('Error processing Yandex data:', e);
                }
                if (callback) callback();
            });
        } else {
            clearTimeout(timeout);
            if (callback) callback();
        }
    } catch(e) {
        clearTimeout(timeout);
        console.warn('Yandex load failed:', e);
        if (callback) callback();
    }
}

// Переопределяем saveProgress, чтобы сохранять и в Яндекс
const originalSaveProgress = saveProgress;
saveProgress = function() {
    originalSaveProgress();
    saveToYandex();
};

// ===== PERSISTENCE =====
function loadSave() {
    try {
        const s = JSON.parse(localStorage.getItem('garageGame') || '{}');
        // Always start from level 0 (first level) - progress is tracked by achievements
        currentLevel = 0;
        score = 0;
        unlockedAchievements = new Set(s.achievements || []);
    } catch(e) {}
}

function saveProgress() {
    try {
        localStorage.setItem('garageGame', JSON.stringify({
            level: currentLevel,
            score,
            achievements: [...unlockedAchievements],
            dailyDate: (() => { try { return JSON.parse(localStorage.getItem('garageGame') || '{}').dailyDate; } catch(e) { return null; } })()
        }));
    } catch(e) {}
}

// ===== SOUNDS =====
const sounds = {
    correct: new Audio('sounds/correct.mp3'),
    wrong:   new Audio('sounds/wrong.mp3'),
    win:     new Audio('sounds/win.mp3'),
    background: new Audio('sounds/background.mp3')
};
sounds.background.loop = true;
sounds.background.volume = 0.2;

// Пауза всех звуков (для сворачивания игры)
window.pauseAllSounds = function() {
    Object.values(sounds).forEach(s => {
        if (s && !s.paused) {
            s.dataset.wasPlaying = 'true';
            s.pause();
        }
    });
};

// Возобновление звуков
window.resumeAllSounds = function() {
    Object.values(sounds).forEach(s => {
        if (s && s.dataset.wasPlaying === 'true') {
            s.play().catch(() => {});
            delete s.dataset.wasPlaying;
        }
    });
};

function playSound(name) {
    try {
        const s = sounds[name];
        if (s) { s.currentTime = 0; s.play().catch(() => {}); }
    } catch(e) {}
}

document.addEventListener('click', function enableBg() {
    sounds.background.play().catch(() => {});
    document.removeEventListener('click', enableBg);
}, { once: true });

// ===== CURSOR FOLLOWER =====
const cursor = document.createElement('div');
cursor.id = 'cursor-item';
document.body.appendChild(cursor);

document.addEventListener('mousemove', e => {
    if (heldItem) {
        cursor.style.left = (e.clientX - 40) + 'px';
        cursor.style.top  = (e.clientY - 40) + 'px';
    }
});

// ===== PARTICLES =====
function spawnParticles(x, y, color) {
    for (let i = 0; i < 10; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.left = x + 'px';
        p.style.top  = y + 'px';
        p.style.background = color;
        const angle = Math.random() * Math.PI * 2;
        const dist  = 40 + Math.random() * 60;
        p.style.setProperty('--dx', Math.cos(angle) * dist + 'px');
        p.style.setProperty('--dy', Math.sin(angle) * dist + 'px');
        document.body.appendChild(p);
        setTimeout(() => p.remove(), 700);
    }
}

// ===== COMBO DISPLAY =====
function showComboPopup(x, y, comboCount) {
    if (comboCount < 2) return;
    const el = document.createElement('div');
    el.className = 'combo-popup';
    el.textContent = `x${comboCount} КОМБО!`;
    el.style.left = x + 'px';
    el.style.top  = (y - 40) + 'px';
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 900);
}

// ===== TIMER =====
function startTimer(seconds) {
    clearInterval(timerInterval);
    timeLeft = seconds;
    updateTimerDisplay();
    if (seconds <= 0) return;
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            onTimeUp();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const el = document.getElementById('timer-value');
    if (!el) return;
    const lvl = LEVELS[currentLevel];
    if (!lvl.timeLimit) {
        el.textContent = '∞';
        el.style.color = '#f1c40f';
        return;
    }
    const m = Math.floor(timeLeft / 60);
    const s = timeLeft % 60;
    el.textContent = `${m}:${s.toString().padStart(2,'0')}`;
    el.style.color = timeLeft <= 30 ? '#e74c3c' : '#f1c40f';
}

function onTimeUp() {
    clearHeld();
    showFailModal('⏰ ВРЕМЯ ВЫШЛО');
}

// ===== STAR RATING =====
function calcStars() {
    const level = LEVELS[currentLevel];
    const total = level.items.length;
    const timeTaken = (Date.now() - levelStartTime) / 1000;
    // 3 stars: no mistakes, fast; 2 stars: few mistakes; 1 star: completed
    if (mistakes === 0 && (!level.timeLimit || timeTaken < level.timeLimit * 0.6)) return 3;
    if (mistakes <= Math.floor(total * 0.15)) return 2;
    return 1;
}

// ===== VICTORY MODAL =====
function showVictoryModal() {
    clearInterval(timerInterval);
    const stars = calcStars();

    // Achievement checks on level complete
    if (mistakes === 0) unlockAchievement('no_mistakes_lvl');
    const lvl = LEVELS[currentLevel];
    if (lvl.timeLimit && timeLeft > lvl.timeLimit * 0.4) unlockAchievement('speed_run');
    if (currentLevel + 1 >= 10)  unlockAchievement('chapter2');
    if (currentLevel + 1 >= 25)  unlockAchievement('chapter3');
    if (currentLevel + 1 >= 40)  unlockAchievement('chapter4');
    if (currentLevel + 1 >= 25)  unlockAchievement('level25');
    if (currentLevel + 1 >= 50)  unlockAchievement('level50');

    addLeaderboardEntry(score, currentLevel + 1);
    saveProgress();

    const old = document.querySelector('.modal-overlay');
    if (old) old.remove();

    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';

    const modal = document.createElement('div');
    modal.className = 'modal-content';

    const ch = getChapter(currentLevel);
    const isLast = currentLevel >= LEVELS.length - 1;

    const starsHtml = ['⭐','⭐','⭐'].map((s,i) =>
        `<span class="star ${i < stars ? 'star-on' : 'star-off'}">${s}</span>`
    ).join('');

    modal.innerHTML = `
        <div class="modal-title">${isLast ? '🏆 МАСТЕР!' : '✅ УРОВЕНЬ ПРОЙДЕН'}</div>
        <div class="modal-chapter" style="color:${ch.color}">${ch.name} — Уровень ${currentLevel+1}/${LEVELS.length}</div>
        <div class="modal-stars">${starsHtml}</div>
        <div class="modal-stats">
            <div class="modal-stat">Счёт: <b>${score}</b></div>
            <div class="modal-stat">Ошибок: <b>${mistakes}</b></div>
            <div class="modal-stat">Макс. комбо: <b>${maxCombo}x</b></div>
        </div>
    `;

    const btn = document.createElement('button');
    btn.className = 'modal-button';

    if (!isLast) {
        btn.textContent = 'ДАЛЕЕ ▶';
        btn.onclick = () => { overlay.remove(); currentLevel++; loadLevel(currentLevel); };
    } else {
        btn.textContent = '🔄 ЗАНОВО';
        btn.onclick = () => {
            overlay.remove();
            currentLevel = 0; score = 0;
            document.getElementById('score').innerText = 0;
            loadLevel(0);
        };
    }

    modal.appendChild(btn);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    playSound('win');
}

function showFailModal(reason) {
    const old = document.querySelector('.modal-overlay');
    if (old) old.remove();

    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';

    const modal = document.createElement('div');
    modal.className = 'modal-content modal-fail';
    modal.innerHTML = `
        <div class="modal-title" style="font-size:48px">${reason}</div>
        <div class="modal-subtitle">Уровень ${currentLevel + 1}</div>
        <div class="modal-stats"><div class="modal-stat">Счёт: ${score}</div></div>
    `;

    const btn = document.createElement('button');
    btn.className = 'modal-button';
    btn.textContent = '🔄 ПОВТОРИТЬ';
    btn.onclick = () => { overlay.remove(); loadLevel(currentLevel); };

    modal.appendChild(btn);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    playSound('wrong');
}

function showFailModal0Stars() {
    clearInterval(timerInterval);
    const old = document.querySelector('.modal-overlay');
    if (old) old.remove();

    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';

    const modal = document.createElement('div');
    modal.className = 'modal-content modal-fail';
    modal.innerHTML = `
        <div class="modal-title" style="font-size:42px">❌ СЛИШКОМ МНОГО ОШИБОК</div>
        <div class="modal-subtitle">Уровень ${currentLevel + 1}</div>
        <div class="modal-stars"><span class="star star-off">⭐</span><span class="star star-off">⭐</span><span class="star star-off">⭐</span></div>
        <div class="modal-stats">
            <div class="modal-stat">Допущено ошибок: <b>${mistakes}</b></div>
            <div class="modal-stat">Счёт: ${score}</div>
        </div>
    `;

    const btn = document.createElement('button');
    btn.className = 'modal-button';
    btn.textContent = '🔄 ПОВТОРИТЬ';
    btn.onclick = () => { overlay.remove(); loadLevel(currentLevel); };

    modal.appendChild(btn);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    playSound('wrong');
}

// ===== LOAD LEVEL =====
let maxCombo = 0;

function loadLevel(levelIndex) {
    clearInterval(timerInterval);
    heldItem = null;
    combo = 0;
    mistakes = 0;
    maxCombo = 0;
    placedCount = 0;
    levelStartTime = Date.now();
    cursor.innerHTML = '';
    cursor.style.display = 'none';
    document.body.style.cursor = 'default';

    const gameArea = document.getElementById('game-area');
    gameArea.innerHTML = '';

    const level = LEVELS[levelIndex];
    itemPool = level.items.map(it => ({ ...it, uid: `${it.toolId}-${Math.random()}` }))
                          .sort(() => Math.random() - 0.5);

    // Update chapter badge
    const ch = getChapter(levelIndex);
    const chapterEl = document.getElementById('chapter-badge');
    if (chapterEl) {
        chapterEl.textContent = ch.name;
        chapterEl.style.background = ch.color;
    }

    // Update combo display
    updateComboDisplay();

    // -- LEFT: chest area --
    const chestWrap = document.createElement('div');
    chestWrap.className = 'chest-area';

    const chest = document.createElement('div');
    chest.className = 'source-chest';
    chest.id = 'source-chest';
    chest.innerHTML = `
        <div class="chest-icon">📦</div>
        <div class="chest-label">ЯЩИК</div>
        <div class="chest-count" id="chest-count">${itemPool.length}</div>
    `;
    chest.addEventListener('click', onChestClick);

    // Progress bar for this level
    const progressWrap = document.createElement('div');
    progressWrap.className = 'level-progress-wrap';
    progressWrap.innerHTML = `
        <div class="level-progress-label">Прогресс</div>
        <div class="level-progress-bar"><div class="level-progress-fill" id="progress-fill" style="width:0%"></div></div>
        <div class="level-progress-text" id="progress-text">0 / ${level.items.length}</div>
    `;

    const chestHint = document.createElement('div');
    chestHint.className = 'chest-hint';
    chestHint.textContent = 'Нажми — взять. ПКМ — вернуть.';

    chestWrap.appendChild(chest);
    chestWrap.appendChild(progressWrap);
    chestWrap.appendChild(chestHint);
    gameArea.appendChild(chestWrap);

    // -- RIGHT: pegboard --
    const board = document.createElement('div');
    board.className = 'pegboard';

    const boardTitle = document.createElement('div');
    boardTitle.className = 'pegboard-title';
    boardTitle.textContent = '🔩 СТЕНД';
    board.appendChild(boardTitle);

    const slotsGrid = document.createElement('div');
    slotsGrid.className = 'slots-grid';

    const shuffledSlots = [...level.slots].sort(() => Math.random() - 0.5);

    shuffledSlots.forEach(slotData => {
        const tool = TOOLS[slotData.toolId];
        const slot = document.createElement('div');
        slot.className = 'slot';
        slot.id = slotData.id;
        slot.setAttribute('data-slot-id', slotData.id);
        slot.setAttribute('data-tool-id', slotData.toolId);

        slot.innerHTML = `
            <div class="slot-svg-icon">${tool.svgIcon}</div>
            <div class="slot-name">${tool.name}</div>
            <div class="slot-items" id="items-in-${slotData.id}"></div>
        `;

        slot.addEventListener('click', onSlotClick);
        slotsGrid.appendChild(slot);
    });

    board.appendChild(slotsGrid);
    gameArea.appendChild(board);

    document.getElementById('level').innerText = `${levelIndex + 1}/${LEVELS.length}`;
    document.getElementById('score').innerText = score;

    startTimer(level.timeLimit);
}

// ===== PROGRESS UPDATE =====
let placedCount = 0;

function updateProgress() {
    const total = LEVELS[currentLevel].items.length;
    const fill = document.getElementById('progress-fill');
    const text = document.getElementById('progress-text');
    if (fill) fill.style.width = (placedCount / total * 100) + '%';
    if (text) text.textContent = `${placedCount} / ${total}`;
}

function updateComboDisplay() {
    const el = document.getElementById('combo-display');
    if (!el) return;
    if (combo >= 2) {
        el.textContent = `🔥 x${combo}`;
        el.style.opacity = '1';
        el.style.transform = 'scale(1.2)';
        setTimeout(() => { el.style.transform = 'scale(1)'; }, 200);
    } else {
        el.textContent = '';
        el.style.opacity = '0';
    }
}

// ===== CHEST CLICK =====
function onChestClick() {
    if (heldItem) return;
    if (itemPool.length === 0) return;

    const idx = Math.floor(Math.random() * itemPool.length);
    heldItem = itemPool.splice(idx, 1)[0];

    document.getElementById('chest-count').textContent = itemPool.length;

    const tool = TOOLS[heldItem.toolId];
    if (tool.image) {
        cursor.innerHTML = `<img src="${tool.image}" alt="${tool.name}">`;
    } else {
        cursor.innerHTML = `<div class="cursor-svg">${tool.svgIcon}</div>`;
    }
    cursor.style.display = 'block';
    document.body.style.cursor = 'none';

    const chest = document.getElementById('source-chest');
    chest.classList.add('chest-pulse');
    setTimeout(() => chest.classList.remove('chest-pulse'), 300);

    highlightSlots(heldItem.toolId, true);
}

// ===== SLOT CLICK =====
function onSlotClick(e) {
    if (!heldItem) return;

    const slotToolId = this.getAttribute('data-tool-id');

    if (slotToolId === heldItem.toolId) {
        playSound('correct');

        // Particles
        const rect = this.getBoundingClientRect();
        spawnParticles(rect.left + rect.width/2, rect.top + rect.height/2, '#2ecc71');

        // Combo
        combo++;
        if (combo > maxCombo) maxCombo = combo;
        const bonusPoints = combo >= 3 ? combo : 1;
        score += bonusPoints;
        showComboPopup(rect.left + rect.width/2, rect.top, combo);
        updateComboDisplay();

        // Achievement checks (no sound — toast only)
        unlockAchievement('first_correct');
        if (combo >= 3) unlockAchievement('combo3');
        if (combo >= 5) unlockAchievement('combo5');
        if (score >= 1000) unlockAchievement('score1000');

        // Place mini icon
        const slotItems = document.getElementById(`items-in-${this.id}`);
        const tool = TOOLS[heldItem.toolId];
        const mini = document.createElement('div');
        mini.className = 'slot-placed-item';
        mini.innerHTML = tool.image
            ? `<img src="${tool.image}" alt="${tool.name}">`
            : tool.svgIcon;
        slotItems.appendChild(mini);

        this.classList.add('slot-correct');
        setTimeout(() => this.classList.remove('slot-correct'), 400);

        document.getElementById('score').innerText = score;

        placedCount++;
        updateProgress();

        clearHeld();
        checkLevelComplete();
    } else {
        playSound('wrong');
        mistakes++;
        combo = 0;
        updateComboDisplay();

        // Penalty: return item to pool
        itemPool.push(heldItem);
        document.getElementById('chest-count').textContent = itemPool.length;

        this.classList.add('slot-wrong');
        setTimeout(() => this.classList.remove('slot-wrong'), 400);
        cursor.classList.add('cursor-shake');
        setTimeout(() => cursor.classList.remove('cursor-shake'), 400);

        // Flash mistake indicator
        const mistakeEl = document.getElementById('mistakes-value');
        if (mistakeEl) {
            mistakeEl.textContent = mistakes;
            mistakeEl.classList.add('mistake-flash');
            setTimeout(() => mistakeEl.classList.remove('mistake-flash'), 400);
        }

        // 3 mistakes = fail with 0 stars
        if (mistakes >= 3) {
            clearHeld();
            showFailModal0Stars();
            return;
        }

        clearHeld();
    }
}

function highlightSlots(toolId, on) {
    document.querySelectorAll('.slot').forEach(slot => {
        if (on) {
            slot.classList.toggle('slot-hint', slot.getAttribute('data-tool-id') === toolId);
            slot.classList.toggle('slot-dim',  slot.getAttribute('data-tool-id') !== toolId);
        } else {
            slot.classList.remove('slot-hint', 'slot-dim');
        }
    });
}

function clearHeld() {
    heldItem = null;
    cursor.innerHTML = '';
    cursor.style.display = 'none';
    document.body.style.cursor = 'default';
    highlightSlots(null, false);
}

document.addEventListener('contextmenu', e => {
    if (heldItem) {
        e.preventDefault();
        itemPool.push(heldItem);
        document.getElementById('chest-count').textContent = itemPool.length;
        clearHeld();
    }
});

function checkLevelComplete() {
    if (itemPool.length === 0 && !heldItem) {
        const total = LEVELS[currentLevel].items.length;
        if (placedCount >= total) {
            completedLevelsCount++;

            if (completedLevelsCount % 3 === 0) {
                // Каждый 3-й уровень — реклама перед окном победы
                showFullscreenAd(() => {
                    setTimeout(showVictoryModal, 400);
                });
            } else {
                // Обычный уровень — сразу победа
                setTimeout(showVictoryModal, 400);
            }
        }
    }
}

// ===== BUTTONS =====
function resetLevel() {
    placedCount = 0;
    completedLevelsCount = 0; // сброс счётчика
    loadLevel(currentLevel);
}

// ===== LEADERBOARD UI =====
function openLeaderboard() {
    const modal = document.getElementById('leaderboard-modal');
    const list  = document.getElementById('leaderboard-list');
    const lb = getLeaderboard();
    if (lb.length === 0) {
        list.innerHTML = '<div class="lb-empty">Пока нет рекордов. Пройди первый уровень!</div>';
    } else {
        list.innerHTML = lb.map((e, i) => `
            <div class="lb-row ${i === 0 ? 'lb-first' : ''}">
                <span class="lb-rank">${['🥇','🥈','🥉'][i] || `#${i+1}`}</span>
                <span class="lb-score">${e.score} очков</span>
                <span class="lb-level">Ур. ${e.level}</span>
                <span class="lb-date">${e.date}</span>
            </div>
        `).join('');
    }
    modal.style.display = 'flex';
}

// ===== ACHIEVEMENTS UI =====
function openAchievements() {
    const modal = document.getElementById('achievements-modal');
    const list  = document.getElementById('achievements-list');
    list.innerHTML = ACHIEVEMENTS_DEF.map(a => {
        const done = unlockedAchievements.has(a.id);
        return `<div class="ach-row ${done ? 'ach-done' : 'ach-locked'}">
            <span class="ach-row-icon">${done ? a.icon : '🔒'}</span>
            <div>
                <div class="ach-row-name">${a.name}</div>
                <div class="ach-row-desc">${done ? a.desc : '???'}</div>
            </div>
        </div>`;
    }).join('');
    modal.style.display = 'flex';
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
    // Сначала пробуем загрузить из Яндекс.Игр
    loadFromYandex(() => {
        // Если в Яндексе нет, загружаем из localStorage
        if (currentLevel === 0 && score === 0 && unlockedAchievements.size === 0) {
            loadSave();
        }
        
        placedCount = 0;

        document.getElementById('resetBtn').onclick = resetLevel;

        document.getElementById('leaderboardBtn').onclick = openLeaderboard;
        document.getElementById('leaderboardClose').onclick = () => {
            document.getElementById('leaderboard-modal').style.display = 'none';
        };

        document.getElementById('achievementsBtn').onclick = openAchievements;
        document.getElementById('achievementsClose').onclick = () => {
            document.getElementById('achievements-modal').style.display = 'none';
        };

        // Load level
        loadLevel(currentLevel);
    });
});
