"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface DateRange {
    from: Date;
    to?: Date;
}

type SearchFormProps = {
    onSearch: (startDate: string, endDate: string) => void;
};

export default function SearchForm({ onSearch }: SearchFormProps) {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const [range, setRange] = useState<DateRange>({ from: yesterday, to: today });
    const { toast } = useToast();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (range.from && range.to) {
            const diffDays =
                (range.to.getTime() - range.from.getTime()) / (1000 * 60 * 60 * 24);
            if (diffDays > 7) {
                toast({ title: "Date range should not exceed 7 days." });
                return;
            }
            onSearch(
                range.from.toISOString().split("T")[0],
                range.to.toISOString().split("T")[0]
            );
        } else {
            toast({ title: "Please select a valid date range." });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 mb-8">
            <div className="w-full flex flex-col items-center justify-center text-center">
                <label className="mb-1 text-sm font-medium block">
                    Select Date Range
                </label>
                <Calendar
                    mode="range"
                    selected={range}
                    onSelect={(newRange) => {
                        if (!newRange || !newRange.from) return;

                        const updatedRange: DateRange = { from: newRange.from };

                        if (newRange.from > today) updatedRange.from = today;
                        if (newRange.to) {
                            updatedRange.to = newRange.to > today ? today : newRange.to;
                        }

                        setRange(updatedRange);
                    }}
                    disabled={{ after: today }}
                    className="w-full p-2 border rounded mx-auto"
                />
            </div>
            <Button type="submit" className="w-full md:w-auto">
                Search
            </Button>
        </form>

    );
}
