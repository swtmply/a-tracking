"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import Filters, {
  AnimateChangeInHeight,
  Filter,
  FilterOption,
  FilterType,
  filterViewOptions,
  filterViewToFilterOptions,
} from "@/components/ui/filters";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SlidersHorizontal, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { nanoid } from "nanoid";

export default function TransactionFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [open, setOpen] = React.useState(false);
  const [selectedView, setSelectedView] = React.useState<FilterType | null>(
    null
  );
  const [commandInput, setCommandInput] = React.useState("");
  const commandInputRef = React.useRef<HTMLInputElement>(null);
  const [filters, setFilters] = React.useState<Filter[]>(
    Array.from(searchParams).map((param) => {
      const filter = JSON.parse(param[1]) as Filter;
      return filter;
    })
  );

  const updateSearchParams = (filter: Filter, filterWithValues?: Filter) => {
    const params = new URLSearchParams(searchParams);
    const existingFilter = params.get(filter.type);

    if (existingFilter) {
      const parsedFilter = JSON.parse(existingFilter);

      if (filterWithValues) {
        parsedFilter.value = filterWithValues.value;
      } else {
        parsedFilter.value.push(filter.value[0]);
      }

      params.set(filter.type, JSON.stringify(parsedFilter));
    } else {
      params.set(filter.type, JSON.stringify(filter));
    }

    router.push(`?${params.toString()}`);
  };

  const removeSearchParams = (type: string) => {
    const params = new URLSearchParams(searchParams);
    const existingFilter = params.get(type);
    if (existingFilter) {
      console.log(existingFilter, type);
      params.delete(type);
    }
    router.push(`?${params.toString()}`);
  };

  const clearSearchParams = () => {
    const params = new URLSearchParams(searchParams);
    const keys = [...params.keys()];
    keys.forEach((key) => params.delete(key));
    router.push(`?${params.toString()}`);
    setFilters([]);
  };

  return (
    <div className="flex gap-2">
      <Filters
        filters={filters}
        setFilters={setFilters}
        removeSearchParams={removeSearchParams}
        updateSearchParams={updateSearchParams}
      />
      {filters.filter((filter) => filter.value?.length > 0).length > 0 && (
        <Button
          variant="outline"
          className="transition group text-xs items-center rounded-sm"
          onClick={clearSearchParams}
        >
          <X />
          Clear
        </Button>
      )}
      <Popover
        open={open}
        onOpenChange={(open) => {
          setOpen(open);
          if (!open) {
            setTimeout(() => {
              setSelectedView(null);
              setCommandInput("");
            }, 200);
          }
        }}
      >
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="transition group items-center rounded-sm flex gap-1.5"
          >
            <SlidersHorizontal className="shrink-0 transition-all text-muted-foreground group-hover:text-primary" />
            Filter
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <AnimateChangeInHeight>
            <Command>
              <CommandInput
                placeholder={selectedView ? selectedView : "Filter..."}
                className="h-9"
                value={commandInput}
                onInputCapture={(e) => {
                  setCommandInput(e.currentTarget.value);
                }}
                ref={commandInputRef}
              />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                {selectedView ? (
                  <CommandGroup>
                    {filterViewToFilterOptions[selectedView].map(
                      (filter: FilterOption) => (
                        <CommandItem
                          className="group text-muted-foreground flex gap-2 items-center"
                          key={filter.name}
                          value={filter.name}
                          disabled={filters.some(
                            (f) =>
                              f.type === selectedView &&
                              f.value.includes(filter.name)
                          )}
                          onSelect={(currentValue) => {
                            updateSearchParams({
                              id: nanoid(),
                              type: selectedView,
                              value: [currentValue],
                            });

                            setFilters((prev) => {
                              const existingFilter = prev.find(
                                (filter) => filter.type === selectedView
                              );
                              if (existingFilter) {
                                const updatedFilters = prev.map((filter) =>
                                  filter.type === selectedView
                                    ? {
                                        ...filter,
                                        value: [...filter.value, currentValue],
                                      }
                                    : filter
                                );

                                return updatedFilters;
                              }
                              const updatedFilters = [
                                ...prev,
                                {
                                  id: nanoid(),
                                  type: selectedView,
                                  value: [currentValue],
                                },
                              ];

                              return updatedFilters;
                            });
                            setTimeout(() => {
                              setSelectedView(null);
                              setCommandInput("");
                            }, 200);
                            setOpen(false);
                          }}
                        >
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
                      )
                    )}
                  </CommandGroup>
                ) : (
                  filterViewOptions.map(
                    (group: FilterOption[], index: number) => (
                      <React.Fragment key={index}>
                        <CommandGroup>
                          {group.map((filter: FilterOption) => (
                            <CommandItem
                              className="group text-muted-foreground flex gap-2 items-center"
                              key={filter.name}
                              value={filter.name}
                              onSelect={(currentValue) => {
                                setSelectedView(currentValue as FilterType);
                                setCommandInput("");
                                commandInputRef.current?.focus();
                              }}
                            >
                              {filter.icon}
                              <span className="text-accent-foreground capitalize">
                                {filter.name}
                              </span>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                        {index < filterViewOptions.length - 1 && (
                          <CommandSeparator />
                        )}
                      </React.Fragment>
                    )
                  )
                )}
              </CommandList>
            </Command>
          </AnimateChangeInHeight>
        </PopoverContent>
      </Popover>
    </div>
  );
}
