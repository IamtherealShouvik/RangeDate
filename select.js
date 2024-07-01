document.addEventListener("DOMContentLoaded", () => {
    const currentMonthYearEl = document.getElementById("currentMonthYear");
    const calendarEl = document.querySelector(".calendar");
    const yearSelectionEl = document.querySelector(".year-selection");
    const today = new Date();
    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    function updateCurrentMonthYear() {
        currentMonthYearEl.textContent = `${monthNames[currentMonth]} ${currentYear}`;
    }

    function generateCalendar() {
        calendarEl.innerHTML = '';

        const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        const prevMonthDays = new Date(currentYear, currentMonth, 0).getDate();

        const daysOfWeek = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
        for (let day of daysOfWeek) {
            const dayEl = document.createElement('div');
            dayEl.classList.add('day', 'bold');
            dayEl.textContent = day;
            calendarEl.appendChild(dayEl);
        }

        let startDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1; // Adjust for weeks starting on Monday

        // Fill in days from the previous month
        for (let i = startDay - 1; i >= 0; i--) {
            const prevMonthDay = document.createElement('div');
            prevMonthDay.classList.add('day', 'prev-month');
            prevMonthDay.textContent = prevMonthDays - i;
            calendarEl.appendChild(prevMonthDay);
        }

        // Fill in days of the current month
        for (let i = 1; i <= daysInMonth; i++) {
            const dayEl = document.createElement("div");
            dayEl.textContent = i;
            dayEl.classList.add("day");
            if (i === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()) {
                dayEl.classList.add("today");
            }
            calendarEl.appendChild(dayEl);
        }

        // Fill in days from the next month
        const totalDaysShown = calendarEl.children.length;
        const remainingDays = 42 - totalDaysShown; // 42 = 7 days * 6 weeks
        for (let i = 1; i <= remainingDays; i++) {
            const nextMonthDay = document.createElement('div');
            nextMonthDay.classList.add('day', 'next-month');
            nextMonthDay.textContent = i;
            calendarEl.appendChild(nextMonthDay);
        }
    }

    function showYearSelection() {
        yearSelectionEl.innerHTML = '';
        yearSelectionEl.style.display = 'grid';

        const startYear = currentYear - 10;
        const endYear = currentYear + 17;

        for (let year = startYear; year <= endYear; year++) {
            const yearEl = document.createElement('div');
            yearEl.classList.add('year');
            yearEl.textContent = year;
            yearEl.addEventListener('click', () => {
                currentYear = year;
                updateCurrentMonthYear();
                generateCalendar();
                yearSelectionEl.style.display = 'none';
            });
            yearSelectionEl.appendChild(yearEl);
        }
    }

    document.getElementById("prevMonth").addEventListener("click", () => {
        if (currentMonth === 0) {
            currentMonth = 11;
            currentYear--;
        } else {
            currentMonth--;
        }
        updateCurrentMonthYear();
        generateCalendar();
    });

    document.getElementById("nextMonth").addEventListener("click", () => {
        if (currentMonth === 11) {
            currentMonth = 0;
            currentYear++;
        } else {
            currentMonth++;
        }
        updateCurrentMonthYear();
        generateCalendar();
    });

    currentMonthYearEl.addEventListener("click", showYearSelection);

    updateCurrentMonthYear();
    generateCalendar();
});
