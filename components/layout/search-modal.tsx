"use client";

import { useState, useEffect, useCallback, memo } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@heroui/modal";
import { Input } from "@heroui/input";
import { Card, CardBody } from "@heroui/card";
import { Link } from "@heroui/link";
import "devicon/devicon.min.css";

import { SearchIcon } from "@/components/common/icons";

interface SearchResult {
  title: string;
  slug: string;
  icon: string;
  excerpt: string;
  matchedLine: string;
}

export const SearchModal = memo(function SearchModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Keyboard shortcut to open search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onOpen();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onOpen]);

  const performSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);

      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(query)}`,
      );

      if (response.ok) {
        const results = await response.json();

        setSearchResults(results);
      }
    } catch {
      // Silently handle search errors
    } finally {
      setIsSearching(false);
    }
  }, []);

  useEffect(() => {
    const debounce = setTimeout(() => {
      performSearch(searchQuery);
    }, 300);

    return () => clearTimeout(debounce);
  }, [searchQuery, performSearch]);

  const handleClose = () => {
    setSearchQuery("");
    setSearchResults([]);
  };

  return (
    <>
      <Input
        readOnly
        aria-label="খুঁজুন"
        classNames={{
          inputWrapper: "bg-default-100 cursor-pointer",
          input: "text-sm bangla-text cursor-pointer",
        }}
        placeholder="খুঁজুন... (Ctrl+K)"
        startContent={
          <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
        }
        type="text"
        onClick={onOpen}
      />

      <Modal
        isOpen={isOpen}
        placement="top"
        scrollBehavior="inside"
        size="3xl"
        onClose={handleClose}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 bangla-text">
                চিটশিট খুঁজুন
              </ModalHeader>
              <ModalBody className="pb-6">
                <Input
                  classNames={{
                    input: "bangla-text",
                  }}
                  placeholder="কমান্ড, টপিক বা কীওয়ার্ড লিখুন..."
                  startContent={<SearchIcon />}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />

                <div className="mt-4 space-y-2">
                  {isSearching && (
                    <p className="text-center text-default-500 bangla-text">
                      খুঁজছি...
                    </p>
                  )}

                  {!isSearching &&
                    searchQuery &&
                    searchResults.length === 0 && (
                      <p className="text-center text-default-500 bangla-text">
                        কোনো ফলাফল পাওয়া যায়নি
                      </p>
                    )}

                  {searchResults.map((result, index) => (
                    <Link
                      key={index}
                      className="block"
                      href={`/${result.slug}`}
                      onClick={onClose}
                    >
                      <Card isHoverable isPressable>
                        <CardBody className="flex flex-row items-start gap-3">
                          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary flex-shrink-0">
                            <i
                              className={`devicon-${result.icon}-plain text-2xl`}
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold bangla-text">
                              {result.title}
                            </h3>
                            <p className="text-sm text-default-500 line-clamp-2 mt-1">
                              {result.matchedLine}
                            </p>
                          </div>
                        </CardBody>
                      </Card>
                    </Link>
                  ))}
                </div>

                {!searchQuery && (
                  <div className="mt-4 bangla-text">
                    <p className="text-sm text-default-500 mb-2">সাজেশন:</p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "git commit",
                        "linux file",
                        "terminal command",
                        "chmod",
                        "merge",
                      ].map((suggestion) => (
                        <button
                          key={suggestion}
                          className="px-3 py-1 rounded-full bg-default-100 hover:bg-default-200 text-sm transition-colors"
                          onClick={() => setSearchQuery(suggestion)}
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
});
