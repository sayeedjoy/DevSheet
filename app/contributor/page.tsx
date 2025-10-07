"use client";

import { useEffect, useState } from "react";
import { Card, CardBody, CardFooter } from "@heroui/card";
import { Avatar } from "@heroui/avatar";
import { Skeleton } from "@heroui/skeleton";
import { Link } from "@heroui/link";
import { FaGithub, FaCode } from "react-icons/fa";

import { title } from "@/config/primitives";

interface Contributor {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  contributions: number;
  type: string;
}

export default function ContributorPage() {
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchContributors() {
      try {
        const response = await fetch("/api/contributors");

        if (!response.ok) {
          throw new Error("Failed to fetch contributors");
        }

        const data = await response.json();

        setContributors(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchContributors();
  }, []);

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8">
      <div className="inline-block max-w-6xl w-full text-center justify-center">
        <h1 className={title({ class: "bangla-text mb-2" })}>কন্ট্রিবিউটর</h1>
        <p className="text-lg text-default-600 bangla-text mb-8">
          এই প্রকল্পে অবদান রাখা সকল ডেভেলপারদের ধন্যবাদ
        </p>

        {error && (
          <div className="text-center py-8">
            <Card className="bg-danger-50 dark:bg-danger-100/10 border border-danger-200 dark:border-danger-800">
              <CardBody>
                <p className="text-danger-600 dark:text-danger-400">
                  Error: {error}
                </p>
                <p className="text-sm text-danger-500 dark:text-danger-300 mt-2">
                  Please make sure the GitHub repository URL is configured
                  correctly in the API route.
                </p>
              </CardBody>
            </Card>
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <Card key={index} className="w-full">
                <CardBody className="flex flex-col items-center gap-3 p-6 pb-4">
                  <Skeleton className="rounded-full w-24 h-24" />
                  <div className="w-full space-y-2">
                    <Skeleton className="h-5 w-3/4 mx-auto rounded-lg" />
                    <Skeleton className="h-4 w-1/2 mx-auto rounded-lg" />
                  </div>
                </CardBody>
                <CardFooter className="justify-center pt-2 pb-4">
                  <Skeleton className="h-4 w-24 rounded-lg" />
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : contributors.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {contributors.map((contributor) => (
                <Card
                  key={contributor.id}
                  className="w-full hover:scale-105 transition-transform duration-200"
                >
                  <CardBody className="flex flex-col items-center gap-3 p-6 pb-4">
                    <Avatar
                      isBordered
                      alt={contributor.login}
                      className="w-24 h-24"
                      color="primary"
                      src={contributor.avatar_url}
                    />
                    <div className="text-center w-full space-y-2">
                      <h3 className="font-semibold text-lg">
                        {contributor.login}
                      </h3>
                      <p className="text-sm text-default-500">
                        <FaCode className="inline text-xs mr-1" />
                        {contributor.contributions} contributions
                      </p>
                    </div>
                  </CardBody>
                  <CardFooter className="justify-center pt-2 pb-4">
                    <Link
                      isExternal
                      className="flex items-center gap-2 text-sm font-medium hover:text-primary"
                      href={contributor.html_url}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <FaGithub className="text-lg" />
                      View Profile
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Card className="bg-primary-50 dark:bg-primary-100/10 border border-primary-200 dark:border-primary-800">
                <CardBody className="p-6">
                  <h2 className="text-xl font-semibold mb-2 bangla-text">
                    কন্ট্রিবিউট করতে চান?
                  </h2>
                  <p className="text-default-600 bangla-text mb-4">
                    আমরা আপনার কন্ট্রিবিউটকে স্বাগত জানাই! GitHub-এ আমাদের
                    রিপোজিটরিতে কন্ট্রিবিউট করুন।
                  </p>
                  <Link
                    isExternal
                    className="inline-flex items-center gap-2 font-semibold"
                    href="https://github.com/sayeedjoy/GymBro"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <FaGithub className="text-xl" />
                    Contribute on GitHub
                  </Link>
                </CardBody>
              </Card>
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <p className="text-default-600">No contributors found.</p>
          </div>
        )}
      </div>
    </section>
  );
}
