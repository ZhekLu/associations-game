export async function getGameSets() {
  return [
    {'id': 1, 'name': 'Смешурики'},
    {'id': 2, 'name': 'Shrek'},
    {'id': 3, 'name': 'Karazina Life'},
    {'id': 4, 'name': 'Disney'},
  ];
}

const setsDescription = {
  1: [
    {'name': 'Бараш'},
    {'name': 'Детище Лосяша'},
    {'name': 'Крош'},
    {'name': 'Лосяш'},
    {'name': 'Черный Ловилас'},
    {'name': 'Кар-Карыч'},
    {'name': 'Муня'},
    {'name': 'Нюша'},
    {'name': 'Железная няня'},
    {'name': 'Ёжик'},
    {'name': 'Тузя'},
    {'name': 'Хрум'},
    {'name': 'Совунья'},
    {'name': 'Панда'},
    {'name': 'Копатыч'},
    {'name': 'Муля'},
    {'name': 'Оживший бутерброд'},
    {'name': 'Пин'},
    {'name': 'Биби'},
    {'name': 'Лили'},
  ],
  2: [
    {'name': 'Королева Лилиан'},
    {'name': 'Лорд Фаркуад'},
    {'name': 'Пиноккио'},
    {'name': 'Три слепых мышонка'},
    {'name': 'Шрек'},
    {'name': 'Артур Пендрагон'},
    {'name': 'Дракониха'},
    {'name': 'Белоснежка'},
    {'name': 'Фея-крёстная'},
    {'name': 'Рапунцель'},
    {'name': 'Фиона'},
    {'name': 'Пряня'},
    {'name': 'Мерлин'},
    {'name': 'Кот в сапогах'},
    {'name': 'Румпельштильцхен'},
    {'name': 'Король Гарольд'},
    {'name': 'Спящая красавица'},
    {'name': 'Осёл'},
    {'name': 'Золушка'},
    {'name': 'Принц Чаминг'},
  ],
  3: [
    {'name': 'Федосеев'},
    {'name': 'Иванова'},
    {'name': 'Яворовская'},
    {'name': 'Гимаева'},
    {'name': 'Маевская'},
    {'name': 'Харченко'},
    {'name': 'Кочарян ст.'},
    {'name': 'Кочарян мл.'},
    {'name': 'Комыш'},
    {'name': 'Крейдун'},
    {'name': 'Лисеная'},
    {'name': 'Плохих'},
    {'name': 'Малофейкина'},
    {'name': 'Милославская'},
    {'name': 'Невоенная'},
    {'name': 'Олефир'},
    {'name': 'Зотова'},
    {'name': 'Павленко'},
    {'name': 'Севостьянов'},
    {'name': 'Яновская'},
  ],
  4: [
    {'name': 'Эльза'},
    {'name': 'Анна'},
    {'name': 'Аврора'},
    {'name': 'Рапунцель'},
    {'name': 'Моана'},
    {'name': 'Мулан'},
    {'name': 'Мерида'},
    {'name': 'Ариэль'},
    {'name': 'Алиса'},
    {'name': 'Белль'},
    {'name': 'Золушка'},
    {'name': 'Эсмеральда'},
    {'name': 'Покахонтас'},
    {'name': 'Тиана'},
    {'name': 'Райя'},
    {'name': 'Белоснежка'},
    {'name': 'Кида'},
    {'name': 'Жасмин'},
    {'name': 'Эмбер'},
    {'name': 'София'},
  ],
};

export function getCardDescription(setID, cardID) {
  return setsDescription[setID][cardID - 1];
}
