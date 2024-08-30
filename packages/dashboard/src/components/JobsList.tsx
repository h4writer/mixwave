import { Link } from "react-router-dom";
import { JobState } from "./JobState";
import { getDurationStr, getShortId, getTimeAgo } from "@/lib/helpers";
import { JobTag } from "./JobTag";
import { filterJobs } from "@/lib/jobs-filter";
import type { JobDto } from "@/tsr";
import type { JobsFilterData } from "./types";

type JobsListProps = {
  jobs: JobDto[];
  filter: JobsFilterData;
};

export function JobsList({ jobs, filter }: JobsListProps) {
  const filteredJobs = filterJobs(jobs, filter);

  return (
    <ul>
      {filteredJobs.map((job) => (
        <li key={job.id} className="mb-2">
          <Link
            to={`/jobs/${job.id}`}
            className="p-4 border border-border rounded-md block bg-white hover:shadow-sm transition-shadow hover:border-gray-300"
          >
            <div className="grid grid-cols-3 gap-2 items-center">
              <div className="flex items-center gap-4">
                <JobState state={job.state} />
                <div>
                  <div className="text-xs">{getShortId(job.id)}</div>
                  {job.name}
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-muted-foreground">
                  {getDurationStr(job.duration)}
                </div>
              </div>
              <div className="text-right">
                {job.tag === "default" ? null : <JobTag tag={job.tag} />}
                <div className="text-sm text-muted-foreground">
                  {getTimeAgo(job.createdOn)}
                </div>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
