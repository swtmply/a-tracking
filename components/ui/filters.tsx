import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  ArrowDownRight,
  ArrowUpRight,
  Banknote,
  BanknoteArrowDown,
  BanknoteArrowUp,
  Bike,
  BriefcaseBusiness,
  Calendar,
  ChartSpline,
  Circle,
  CreditCard,
  HandCoins,
  Heart,
  LineSquiggle,
  PhilippinePeso,
  PiggyBank,
  Plane,
  Shell,
  ShoppingBag,
  ShoppingBasket,
  Siren,
  SmartphoneNfc,
  TvMinimalPlay,
  User,
  Utensils,
  UtilityPole,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

interface AnimateChangeInHeightProps {
  children: React.ReactNode;
  className?: string;
}

export const AnimateChangeInHeight: React.FC<AnimateChangeInHeightProps> = ({
  children,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState<number | "auto">("auto");

  useEffect(() => {
    if (containerRef.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        // We only have one entry, so we can use entries[0].
        const observedHeight = entries[0].contentRect.height;
        setHeight(observedHeight);
      });

      resizeObserver.observe(containerRef.current);

      return () => {
        // Cleanup the observer when the component is unmounted
        resizeObserver.disconnect();
      };
    }
  }, []);

  return (
    <motion.div
      className={cn(className, "overflow-hidden")}
      style={{ height }}
      animate={{ height }}
      transition={{ duration: 0.1, damping: 0.2, ease: "easeIn" }}
    >
      <div ref={containerRef}>{children}</div>
    </motion.div>
  );
};

export enum FilterType {
  TYPE = "Type",
  SAVINGS_CATEGORY = "Savings Category",
  EXPENSE_CATEGORY = "Expenses Category",
  INCOME_CATEGORY = "Income Category",
  DATE_RANGE = "Date Range",
}

export enum Type {
  SAVINGS = "savings",
  EXPENSES = "expenses",
  INCOME = "income",
}

export enum SavingsCategory {
  EMERGENCY = "emergency",
  INVESTMENTS = "investments",
  RETIREMENT = "retirement",
  VACATION = "vacation",
  OTHERS = "others",
}

export enum ExpenseCategory {
  CREDIT_CARD = "credit card",
  ONLINE_PAYMENT = "online payment",
  PERSONAL = "personal",
  LIFESTYLE = "lifestyle",
  FOOD = "food",
  SHOPPING = "shopping",
  GROCERIES = "groceries",
  UTILITIES = "utilities",
  ENTERTAINMENT = "entertainment",
  TRANSPORTATION = "transportation",
  OTHERS = "others",
}

export enum IncomeCategory {
  SALARY = "salary",
  FREELANCE = "freelance",
  INVESTMENTS = "investments",
  BUSINESS = "business",
  OTHERS = "others",
}

export enum DateRange {
  JAN_01 = "Jan_01",
  JAN_02 = "Jan_02",
  FEB_01 = "Feb_01",
  FEB_02 = "Feb_02",
  MAR_01 = "Mar_01",
  MAR_02 = "Mar_02",
  APR_01 = "Apr_01",
  APR_02 = "Apr_02",
  MAY_01 = "May_01",
  MAY_02 = "May_02",
  JUN_01 = "Jun_01",
  JUN_02 = "Jun_02",
  JUL_01 = "Jul_01",
  JUL_02 = "Jul_02",
  AUG_01 = "Aug_01",
  AUG_02 = "Aug_02",
  SEP_01 = "Sep_01",
  SEP_02 = "Sep_02",
  OCT_01 = "Oct_01",
  OCT_02 = "Oct_02",
  NOV_01 = "Nov_01",
  NOV_02 = "Nov_02",
  DEC_01 = "Dec_01",
  DEC_02 = "Dec_02",
}

export type FilterOption = {
  name:
    | FilterType
    | Type
    | SavingsCategory
    | ExpenseCategory
    | IncomeCategory
    | DateRange;
  icon: React.ReactNode | undefined;
  label?: string;
};

export type Filter = {
  id: string;
  type: FilterType;
  value: string[];
};

const FilterIcon = ({
  type,
}: {
  type:
    | FilterType
    | Type
    | SavingsCategory
    | ExpenseCategory
    | IncomeCategory
    | DateRange;
}) => {
  switch (type) {
    case SavingsCategory.EMERGENCY:
      return <Siren className="size-3.5" />;
    case SavingsCategory.INVESTMENTS:
      return <ChartSpline className="size-3.5" />;
    case SavingsCategory.RETIREMENT:
      return <Heart className="size-3.5" />;
    case SavingsCategory.VACATION:
      return <Plane className="size-3.5" />;
    case SavingsCategory.OTHERS:
      return <Circle className="size-3.5" />;
    case FilterType.TYPE:
      return <PhilippinePeso className="size-3.5" />;
    case FilterType.SAVINGS_CATEGORY:
      return <PiggyBank className="size-3.5" />;
    case FilterType.EXPENSE_CATEGORY:
      return <ArrowDownRight className="size-3.5" />;
    case FilterType.INCOME_CATEGORY:
      return <ArrowUpRight className="size-3.5" />;
    case FilterType.DATE_RANGE:
      return <Calendar className="size-3.5" />;
    case Type.SAVINGS:
      return <Banknote className="size-3.5 text-blue-600 dark:text-blue-400" />;
    case Type.EXPENSES:
      return (
        <BanknoteArrowDown className="size-3.5 text-red-600 dark:text-red-400" />
      );
    case Type.INCOME:
      return (
        <BanknoteArrowUp className="size-3.5 text-green-600 dark:text-green-400" />
      );
    case ExpenseCategory.CREDIT_CARD:
      return <CreditCard className="size-3.5" />;
    case ExpenseCategory.ONLINE_PAYMENT:
      return <SmartphoneNfc className="size-3.5" />;
    case ExpenseCategory.PERSONAL:
      return <User className="size-3.5" />;
    case ExpenseCategory.LIFESTYLE:
      return <Shell className="size-3.5" />;
    case ExpenseCategory.FOOD:
      return <Utensils className="size-3.5" />;
    case ExpenseCategory.SHOPPING:
      return <ShoppingBag className="size-3.5" />;
    case ExpenseCategory.GROCERIES:
      return <ShoppingBasket className="size-3.5" />;
    case ExpenseCategory.UTILITIES:
      return <UtilityPole className="size-3.5" />;
    case ExpenseCategory.ENTERTAINMENT:
      return <TvMinimalPlay className="size-3.5" />;
    case ExpenseCategory.TRANSPORTATION:
      return <Bike className="size-3.5" />;
    case ExpenseCategory.OTHERS:
      return <Circle className="size-3.5" />;
    case IncomeCategory.SALARY:
      return <HandCoins className="size-3.5" />;
    case IncomeCategory.FREELANCE:
      return <LineSquiggle className="size-3.5" />;
    case IncomeCategory.INVESTMENTS:
      return <ChartSpline className="size-3.5" />;
    case IncomeCategory.BUSINESS:
      return <BriefcaseBusiness className="size-3.5" />;
    case IncomeCategory.OTHERS:
      return <Circle className="size-3.5" />;
    case DateRange.JAN_01:
      return <Calendar className="size-3.5 text-red-600 dark:text-red-500" />;
    case DateRange.JAN_02:
      return <Calendar className="size-3.5 text-red-600 dark:text-red-500" />;
    case DateRange.FEB_01:
      return (
        <Calendar className="size-3.5 text-orange-600 dark:text-orange-500" />
      );
    case DateRange.FEB_02:
      return (
        <Calendar className="size-3.5 text-orange-600 dark:text-orange-500" />
      );
    case DateRange.MAR_01:
      return (
        <Calendar className="size-3.5 text-yellow-600 dark:text-yellow-500" />
      );
    case DateRange.MAR_02:
      return (
        <Calendar className="size-3.5 text-yellow-600 dark:text-yellow-500" />
      );
    case DateRange.APR_01:
      return (
        <Calendar className="size-3.5 text-green-600 dark:text-green-500" />
      );
    case DateRange.APR_02:
      return (
        <Calendar className="size-3.5 text-green-600 dark:text-green-500" />
      );
    case DateRange.MAY_01:
      return <Calendar className="size-3.5 text-blue-600 dark:text-blue-500" />;
    case DateRange.MAY_02:
      return <Calendar className="size-3.5 text-blue-600 dark:text-blue-500" />;
    case DateRange.JUN_01:
      return (
        <Calendar className="size-3.5 text-indigo-600 dark:text-indigo-500" />
      );
    case DateRange.JUN_02:
      return (
        <Calendar className="size-3.5 text-indigo-600 dark:text-indigo-500" />
      );
    case DateRange.JUL_01:
      return (
        <Calendar className="size-3.5 text-violet-600 dark:text-violet-500" />
      );
    case DateRange.JUL_02:
      return (
        <Calendar className="size-3.5 text-violet-600 dark:text-violet-500" />
      );
    case DateRange.AUG_01:
      return <Calendar className="size-3.5 text-teal-600 dark:text-teal-500" />;
    case DateRange.AUG_02:
      return <Calendar className="size-3.5 text-teal-600 dark:text-teal-500" />;
    case DateRange.SEP_01:
      return <Calendar className="size-3.5 text-cyan-600 dark:text-cyan-500" />;
    case DateRange.SEP_02:
      return <Calendar className="size-3.5 text-cyan-600 dark:text-cyan-500" />;
    case DateRange.OCT_01:
      return (
        <Calendar className="size-3.5 text-emerald-600 dark:text-emerald-500" />
      );
    case DateRange.OCT_02:
      return (
        <Calendar className="size-3.5 text-emerald-600 dark:text-emerald-500" />
      );
    case DateRange.NOV_01:
      return (
        <Calendar className="size-3.5 text-fuchsia-600 dark:text-fuchsia-500" />
      );
    case DateRange.NOV_02:
      return (
        <Calendar className="size-3.5 text-fuchsia-600 dark:text-fuchsia-500" />
      );
    case DateRange.DEC_01:
      return (
        <Calendar className="size-3.5 text-amber-600 dark:text-amber-500" />
      );
    case DateRange.DEC_02:
      return (
        <Calendar className="size-3.5 text-amber-600 dark:text-amber-500" />
      );
  }
};

export const filterViewOptions: FilterOption[][] = [
  [
    {
      name: FilterType.TYPE,
      icon: <FilterIcon type={FilterType.TYPE} />,
    },
    {
      name: FilterType.EXPENSE_CATEGORY,
      icon: <FilterIcon type={FilterType.EXPENSE_CATEGORY} />,
    },
    {
      name: FilterType.INCOME_CATEGORY,
      icon: <FilterIcon type={FilterType.INCOME_CATEGORY} />,
    },
    {
      name: FilterType.SAVINGS_CATEGORY,
      icon: <FilterIcon type={FilterType.SAVINGS_CATEGORY} />,
    },
    {
      name: FilterType.DATE_RANGE,
      icon: <FilterIcon type={FilterType.DATE_RANGE} />,
    },
  ],
];

export const typeFilterOptions: FilterOption[] = Object.values(Type).map(
  (type) => ({
    name: type,
    icon: <FilterIcon type={type} />,
  })
);

export const expenseCategoryFilterOptions: FilterOption[] = Object.values(
  ExpenseCategory
).map((type) => ({
  name: type,
  icon: <FilterIcon type={type} />,
}));

export const incomeCategoryFilterOptions: FilterOption[] = Object.values(
  IncomeCategory
).map((type) => ({
  name: type,
  icon: <FilterIcon type={type} />,
}));

export const savingsCategoryFilterOptions: FilterOption[] = Object.values(
  SavingsCategory
).map((type) => ({
  name: type,
  icon: <FilterIcon type={type} />,
}));

export const dateRangeFilterOptions: FilterOption[] = Object.values(
  DateRange
).map((type) => ({
  name: type,
  icon: <FilterIcon type={type} />,
}));

export const filterViewToFilterOptions: Record<FilterType, FilterOption[]> = {
  [FilterType.TYPE]: typeFilterOptions,
  [FilterType.EXPENSE_CATEGORY]: expenseCategoryFilterOptions,
  [FilterType.INCOME_CATEGORY]: incomeCategoryFilterOptions,
  [FilterType.SAVINGS_CATEGORY]: savingsCategoryFilterOptions,
  [FilterType.DATE_RANGE]: dateRangeFilterOptions,
};

const FilterValueCombobox = ({
  filterType,
  filterValues,
  setFilterValues,
}: {
  filterType: FilterType;
  filterValues: string[];
  setFilterValues: (filterValues: string[]) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [commandInput, setCommandInput] = useState("");
  const commandInputRef = useRef<HTMLInputElement>(null);
  const nonSelectedFilterValues = filterViewToFilterOptions[filterType]?.filter(
    (filter) => !filterValues.includes(filter.name)
  );

  return (
    <Popover
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
        if (!open) {
          setTimeout(() => {
            setCommandInput("");
          }, 200);
        }
      }}
    >
      <PopoverTrigger
        className="rounded-none px-1.5 py-1 bg-muted hover:bg-muted/50 transition
  text-muted-foreground hover:text-primary shrink-0 capitalize"
      >
        <div className="flex gap-1.5 items-center">
          {filterValues?.length === 1
            ? filterValues?.[0]
            : `${filterValues?.length} selected`}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <AnimateChangeInHeight>
          <Command>
            <CommandInput
              placeholder={filterType}
              className="h-9"
              value={commandInput}
              onInputCapture={(e) => {
                setCommandInput(e.currentTarget.value);
              }}
              ref={commandInputRef}
            />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {filterValues.map((value) => (
                  <CommandItem
                    key={value}
                    className="group flex gap-2 items-center capitalize"
                    onSelect={() => {
                      setFilterValues(filterValues.filter((v) => v !== value));
                      setTimeout(() => {
                        setCommandInput("");
                      }, 200);
                      setOpen(false);
                    }}
                  >
                    <Checkbox checked={true} />
                    <FilterIcon type={value as FilterType} />
                    {value}
                  </CommandItem>
                ))}
              </CommandGroup>
              {nonSelectedFilterValues?.length > 0 && (
                <>
                  <CommandSeparator />
                  <CommandGroup>
                    {nonSelectedFilterValues.map((filter: FilterOption) => (
                      <CommandItem
                        className="group flex gap-2 items-center"
                        key={filter.name}
                        value={filter.name}
                        onSelect={(currentValue: string) => {
                          setFilterValues([...filterValues, currentValue]);
                          setTimeout(() => {
                            setCommandInput("");
                          }, 200);
                          setOpen(false);
                        }}
                      >
                        <Checkbox
                          checked={false}
                          className="opacity-0 group-data-[selected=true]:opacity-100"
                        />
                        {filter.icon}
                        <span className="text-accent-foreground capitalize">
                          {filter.name}
                        </span>
                        {filter.label && (
                          <span className="text-muted-foreground text-xs ml-auto capitalize">
                            {filter.label}
                          </span>
                        )}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </>
              )}
            </CommandList>
          </Command>
        </AnimateChangeInHeight>
      </PopoverContent>
    </Popover>
  );
};

export default function Filters({
  filters,
  setFilters,
  removeSearchParams,
  updateSearchParams,
}: {
  filters: Filter[];
  setFilters: Dispatch<SetStateAction<Filter[]>>;
  removeSearchParams: (type: string) => void;
  updateSearchParams: (filter: Filter, filterWithValues?: Filter) => void;
}) {
  return (
    <div className="flex gap-2">
      {filters
        .filter((filter) => filter.value?.length > 0)
        .map((filter) => (
          <div key={filter.id} className="flex gap-[1px] items-center text-xs">
            <div className="flex gap-1.5 shrink-0 rounded-l bg-muted px-1.5 py-1 items-center capitalize">
              <FilterIcon type={filter.type} />
              {filter.type}
            </div>

            <FilterValueCombobox
              filterType={filter.type}
              filterValues={filter.value}
              setFilterValues={(filterValues) => {
                setFilters((prev) =>
                  prev.map((f) =>
                    f.id === filter.id ? { ...f, value: filterValues } : f
                  )
                );

                updateSearchParams(
                  {
                    id: filter.id,
                    type: filter.type,
                    value: [],
                  },
                  {
                    id: filter.id,
                    type: filter.type,
                    value: filterValues,
                  }
                );
              }}
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setFilters((prev) => prev.filter((f) => f.id !== filter.id));
                removeSearchParams(filter.type);
              }}
              className="bg-muted rounded-l-none rounded-r-sm h-6 w-6 text-muted-foreground hover:text-primary hover:bg-muted/50 transition shrink-0"
            >
              <X className="size-3" />
            </Button>
          </div>
        ))}
    </div>
  );
}
