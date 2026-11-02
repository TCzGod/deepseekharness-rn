# sync-upstream.ps1 — 单向同步上游更新到本仓库（不推送上游）
# 用法: powershell -ExecutionPolicy Bypass -File scripts\sync-upstream.ps1

$ErrorActionPreference = "Stop"
$repo = "d:\pyprogram\deepseekharness-rn"
Set-Location $repo

$log = "[$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')] 开始同步"

try {
    # 1. 拉取上游更新
    git fetch upstream
    if ($LASTEXITCODE -ne 0) { throw "git fetch upstream 失败" }

    # 2. 检查是否有新提交
    $behind = git rev-list --count "HEAD..upstream/master"
    if ([int]$behind -eq 0) {
        Write-Output "$log | 已是最新，无上游更新"
        exit 0
    }
    Write-Output "$log | 发现 $behind 个上游新提交，开始合并"

    # 3. 合并上游（保留本地定制，不打开编辑器）
    git merge upstream/master --no-edit
    if ($LASTEXITCODE -ne 0) {
        Write-Output "$log | 合并冲突！请手动解决后执行: git push origin HEAD"
        Write-Output "冲突文件: "
        git diff --name-only --diff-filter=U
        exit 1
    }

    # 4. 推送到自己的远程（origin），绝不推送 upstream
    git push origin HEAD
    if ($LASTEXITCODE -ne 0) { throw "git push origin 失败" }

    Write-Output "$log | 同步完成：已合并 $behind 个上游提交并推送到 origin"
    exit 0
}
catch {
    Write-Output "$log | 同步失败: $_"
    exit 1
}
