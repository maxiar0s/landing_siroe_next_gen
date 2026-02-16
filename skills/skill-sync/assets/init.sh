#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/../../.." && pwd)"

OUTPUT_DIR="${REPO_ROOT}/.skill-sync-cache"
OUTPUT_FILE="${OUTPUT_DIR}/skill-files.txt"

mkdir -p "${OUTPUT_DIR}"

declare -a SEARCH_ROOTS=(
  "${REPO_ROOT}/skills"
  "${REPO_ROOT}/.agents/skills"
  "${REPO_ROOT}/skills-sync"
  "${REPO_ROOT}/.agents/skills-sync"
)

SKILL_FILES=()

for root in "${SEARCH_ROOTS[@]}"; do
  if [[ ! -d "${root}" ]]; then
    continue
  fi

  while IFS= read -r skill_file; do
    SKILL_FILES+=("${skill_file}")
  done < <(find "${root}" -mindepth 2 -maxdepth 2 -type f -name "SKILL.md" 2>/dev/null | sort)
done

printf "%s\n" "${SKILL_FILES[@]}" > "${OUTPUT_FILE}"

echo "Initialized skill index"
echo "- Output: ${OUTPUT_FILE}"
echo "- Skills found: ${#SKILL_FILES[@]}"
