<?php
// app/Traits/Auditable.php

namespace App\Traits;

use App\Models\AuditLog;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;

trait Auditable
{
    protected static function bootAuditable()
    {
        static::created(function ($model) {
            $model->auditLog('create');
        });

        static::updated(function ($model) {
            $model->auditLog('update');
        });

        static::deleted(function ($model) {
            $model->auditLog('delete');
        });
    }

    protected function auditLog($action)
    {
        if (!Auth::check()) {
            return;
        }

        AuditLog::create([
            'user_id' => Auth::id(),
            'action' => $action,
            'model_type' => get_class($this),
            'model_id' => $this->id,
            'old_values' => $action === 'update' ? $this->getOriginal() : null,
            'new_values' => $action !== 'delete' ? $this->getAttributes() : null,
            'ip_address' => Request::ip(),
            'user_agent' => Request::userAgent()
        ]);
    }
}